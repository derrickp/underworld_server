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
 * Result of exiting the room.
 * @export
 * @interface RoomExited
 */
export interface RoomExited {
    /**
     * 
     * @type {Array<GameEvent>}
     * @memberof RoomExited
     */
    events: Array<GameEvent>;
    /**
     * 
     * @type {Array<PerformAction>}
     * @memberof RoomExited
     */
    actions: Array<PerformAction>;
}

export function RoomExitedFromJSON(json: any): RoomExited {
    return RoomExitedFromJSONTyped(json, false);
}

export function RoomExitedFromJSONTyped(json: any, ignoreDiscriminator: boolean): RoomExited {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'events': ((json['events'] as Array<any>).map(GameEventFromJSON)),
        'actions': ((json['actions'] as Array<any>).map(PerformActionFromJSON)),
    };
}

export function RoomExitedToJSON(value?: RoomExited | null): any {
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
