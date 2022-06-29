/* tslint:disable */
/* eslint-disable */
/**
 * Underworld
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.5.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    GameEvent,
    GameEventFromJSON,
    GameEventFromJSONTyped,
    GameEventToJSON,
} from './GameEvent';
import {
    PerformAction,
    PerformActionFromJSON,
    PerformActionFromJSONTyped,
    PerformActionToJSON,
} from './PerformAction';

/**
 * Results from attack on the NPC.
 * @export
 * @interface ItemSold
 */
export interface ItemSold {
    /**
     * Events that happened due to the attack.
     * @type {Array<GameEvent>}
     * @memberof ItemSold
     */
    events: Array<GameEvent>;
    /**
     * Actions that can now be performed after the attack.
     * @type {Array<PerformAction>}
     * @memberof ItemSold
     */
    actions: Array<PerformAction>;
}

export function ItemSoldFromJSON(json: any): ItemSold {
    return ItemSoldFromJSONTyped(json, false);
}

export function ItemSoldFromJSONTyped(json: any, ignoreDiscriminator: boolean): ItemSold {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'events': ((json['events'] as Array<any>).map(GameEventFromJSON)),
        'actions': ((json['actions'] as Array<any>).map(PerformActionFromJSON)),
    };
}

export function ItemSoldToJSON(value?: ItemSold | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'events': ((value.events as Array<any>).map(GameEventToJSON)),
        'actions': ((value.actions as Array<any>).map(PerformActionToJSON)),
    };
}
