import { FunctionComponent } from "react";
import {
  Inventory,
  Item,
  ItemDescriptor,
  ItemType,
} from "../../../generated-api";
import { Colors, useTheme } from "../../../themes";
import { LootNpcView } from "../../actions/LootNpcView";
import { Card } from "../../Card";

import styles from "./NpcInventoryView.module.css";

export interface NpcInventoryViewProps {
  npcId: string;
  inventory: Inventory;
  canLoot: boolean;
}

const itemTypeText = (itemType: ItemType): string => itemType.replace("_", " ");
const descriptorText = (descriptor: ItemDescriptor): string =>
  descriptor.replace("_", " ");

interface ItemViewProps {
  item: Item;
  npcId: string;
  canLoot: boolean;
  colors: Colors;
}

const ItemView: FunctionComponent<ItemViewProps> = ({
  item,
  npcId,
  canLoot,
}) => (
  <Card className={styles.item}>
    <div className={styles["item-name"]}>
      {[
        ...item.descriptors.map(descriptorText),
        item.material ? item.material : "",
        itemTypeText(item.item_type),
      ].join(" ")}
    </div>
    {canLoot && <LootNpcView args={{ npc_id: npcId, item_ids: [item.id] }} />}
  </Card>
);

export const NpcInventoryView: FunctionComponent<NpcInventoryViewProps> = ({
  npcId,
  inventory,
  canLoot,
}) => {
  const { theme } = useTheme();

  if (!inventory.equipment.length) {
    return <div>They have no items on them.</div>;
  }

  const equippedItems = inventory.equipment.filter((c) => c.at_the_ready);
  const unequippedItems = inventory.equipment.filter((c) => !c.at_the_ready);

  return (
    <div className={styles.items}>
      <div className={styles["equipped-text"]}>Equipped Items</div>
      {equippedItems.length === 0 && "They have nothing equipped"}
      {equippedItems.map((characterItem, index) => (
        <ItemView
          key={index}
          item={characterItem.item}
          npcId={npcId}
          canLoot={canLoot}
          colors={theme.colors}
        />
      ))}
      <div className={styles["equipped-text"]}>Unequipped Items</div>
      {unequippedItems.length === 0 && "They have nothing packed away"}
      {unequippedItems.map((characterItem, index) => (
        <ItemView
          key={index}
          item={characterItem.item}
          npcId={npcId}
          canLoot={canLoot}
          colors={theme.colors}
        />
      ))}
    </div>
  );
};
