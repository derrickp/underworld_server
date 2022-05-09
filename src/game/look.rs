use poem_openapi::Object;
use serde::{Deserialize, Serialize};
use sqlx::{Postgres, Transaction};
use underworld_core::{
    actions::{
        action::Action, inspect_npc::InspectNpc, look_at_current_room::LookAtCurrentRoom,
        look_at_npc::LookAtNpc,
    },
    components::{
        non_player::NonPlayerView,
        rooms::room_view::{RoomView, RoomViewArgs},
    },
    events::event::Event,
    game::Game,
    systems::view::room,
};

use crate::{
    actions::{game_actions, PerformAction},
    error::GameError,
};

#[derive(Deserialize, Object, Serialize)]
pub struct RoomLookArgs {
    pub username: String,
    pub game_id: String,
}

#[derive(Deserialize, Object, Serialize)]
pub struct NpcLookArgs {
    pub username: String,
    pub game_id: String,
    pub npc_id: String,
}

impl From<&NpcLookArgs> for LookAtNpc {
    fn from(val: &NpcLookArgs) -> Self {
        LookAtNpc {
            npc_id: val.npc_id.clone(),
        }
    }
}

pub async fn look_at_room(
    transaction: &mut Transaction<'_, Postgres>,
    args: &RoomLookArgs,
) -> Result<RoomView, GameError> {
    let state = match super::repository::by_id(transaction, &args.username, &args.game_id)
        .await
        .unwrap()
    {
        Some(it) => it,
        None => return Err(GameError::GameNotFound),
    };

    let player =
        match crate::player_characters::repository::current(transaction, &args.username)
            .await
            .unwrap()
        {
            Some(it) => it,
            None => return Err(GameError::NoPlayerCharacterSet),
        };

    let mut game = Game { state, player };

    let action = Action::LookAtCurrentRoom(LookAtCurrentRoom);
    let events = game.handle_action(&action)?;

    match events.iter().find_map(|event| match event {
        Event::RoomViewed(it) => Some(it),
        _ => None,
    }) {
        Some(room_viewed) => Ok(room_viewed.view.clone()),
        None => Err(GameError::General),
    }
}

pub async fn quick_look_room(
    transaction: &mut Transaction<'_, Postgres>,
    args: &RoomLookArgs,
) -> Result<RoomView, GameError> {
    let state = match super::repository::by_id(transaction, &args.username, &args.game_id)
        .await
        .unwrap()
    {
        Some(it) => it,
        None => return Err(GameError::GameNotFound),
    };

    Ok(room::look_at(
        state.current_room(),
        RoomViewArgs::default(),
        false,
    ))
}

pub async fn look_at_npc(
    transaction: &mut Transaction<'_, Postgres>,
    args: &NpcLookArgs,
) -> Result<NonPlayerView, GameError> {
    let state = match super::repository::by_id(transaction, &args.username, &args.game_id)
        .await
        .unwrap()
    {
        Some(it) => it,
        None => return Err(GameError::GameNotFound),
    };

    let player =
        match crate::player_characters::repository::current(transaction, &args.username)
            .await
            .unwrap()
        {
            Some(it) => it,
            None => return Err(GameError::NoPlayerCharacterSet),
        };

    let mut game = Game { state, player };
    let look_args: LookAtNpc = LookAtNpc::from(args);
    let action = Action::LookAtNpc(look_args);
    let events = game.handle_action(&action)?;

    match events.iter().find_map(|event| match event {
        Event::NpcViewed(it) => Some(it),
        _ => None,
    }) {
        Some(npc_viewed) => Ok(npc_viewed.npc_view.clone()),
        None => Err(GameError::General),
    }
}

#[derive(Deserialize, Object, Serialize)]
pub struct InspectNpcArgs {
    /// Username to use.
    pub username: String,
    /// Game to perform action.
    pub game_id: String,
    /// NPC to inspect.
    pub npc_id: String,
    /// Attempt to discover the NPC's health.
    pub discover_health: bool,
    /// Attempt to discover the NPC's name.
    pub discover_name: bool,
    /// Attempt to discover the items the NPC has packed away.
    pub discover_packed_items: bool,
    /// Attempt to discover any hidden items the NPC has.
    pub discover_hidden_items: bool,
}

#[derive(Object, Serialize)]
pub struct NpcInspected {
    pub health_discovered: bool,
    pub name_discovered: bool,
    pub packed_items_discovered: bool,
    pub hidden_items_discovered: bool,
    pub actions: Vec<PerformAction>,
}

pub async fn inspect_npc(
    transaction: &mut Transaction<'_, Postgres>,
    args: &InspectNpcArgs,
) -> Result<NpcInspected, GameError> {
    let state = match super::repository::by_id(transaction, &args.username, &args.game_id)
        .await
        .unwrap()
    {
        Some(it) => it,
        None => return Err(GameError::GameNotFound),
    };
    let player =
        match crate::player_characters::repository::current(transaction, &args.username)
            .await
            .unwrap()
        {
            Some(it) => it,
            None => return Err(GameError::NoPlayerCharacterSet),
        };
    let mut game = Game { state, player };

    let inspect_args = InspectNpc {
        npc_id: args.npc_id.clone(),
        discover_health: args.discover_health,
        discover_name: args.discover_name,
        discover_packed_items: args.discover_packed_items,
        discover_hidden_items: args.discover_hidden_items,
    };
    let action = Action::InspectNpc(inspect_args);
    let events = game.handle_action(&action)?;

    super::repository::save(transaction, &args.username, &game.state)
        .await
        .unwrap();
    crate::player_characters::repository::save(transaction, &args.username, &game.player)
        .await
        .unwrap();

    let mut npc_inspected = NpcInspected {
        health_discovered: false,
        name_discovered: false,
        packed_items_discovered: false,
        hidden_items_discovered: false,
        actions: game_actions(&game, &args.username),
    };

    for event in events {
        match event {
            Event::NpcHealthDiscovered(_) => {
                npc_inspected.health_discovered = true;
            }
            Event::NpcHiddenDiscovered(_) => {
                npc_inspected.hidden_items_discovered = true;
            }
            Event::NpcNameDiscovered(_) => {
                npc_inspected.name_discovered = true;
            }
            Event::NpcPackedDiscovered(_) => {
                npc_inspected.packed_items_discovered = true;
            }
            _ => {}
        }
    }

    Ok(npc_inspected)
}
