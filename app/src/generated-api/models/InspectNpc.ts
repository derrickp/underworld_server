/* tslint:disable */
/* eslint-disable */
/**
 * Underworld
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.2.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * Inspect an NPC, with a chance to reveal more information
 * than was previously known about the NPC.
 * @export
 * @interface InspectNpc
 */
export interface InspectNpc {
    /**
     * 
     * @type {string}
     * @memberof InspectNpc
     */
    npc_id: string;
    /**
     * Attempt to discover the NPC's health.
     * @type {boolean}
     * @memberof InspectNpc
     */
    discover_health: boolean;
    /**
     * Attempt to discover the NPC's name.
     * @type {boolean}
     * @memberof InspectNpc
     */
    discover_name: boolean;
    /**
     * Attempt to discover the items the NPC has packed away.
     * @type {boolean}
     * @memberof InspectNpc
     */
    discover_packed_items: boolean;
    /**
     * Attempt to discover any hidden items the NPC has.
     * @type {boolean}
     * @memberof InspectNpc
     */
    discover_hidden_items: boolean;
}

export function InspectNpcFromJSON(json: any): InspectNpc {
    return InspectNpcFromJSONTyped(json, false);
}

export function InspectNpcFromJSONTyped(json: any, ignoreDiscriminator: boolean): InspectNpc {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'npc_id': json['npc_id'],
        'discover_health': json['discover_health'],
        'discover_name': json['discover_name'],
        'discover_packed_items': json['discover_packed_items'],
        'discover_hidden_items': json['discover_hidden_items'],
    };
}

export function InspectNpcToJSON(value?: InspectNpc | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'npc_id': value.npc_id,
        'discover_health': value.discover_health,
        'discover_name': value.discover_name,
        'discover_packed_items': value.discover_packed_items,
        'discover_hidden_items': value.discover_hidden_items,
    };
}
