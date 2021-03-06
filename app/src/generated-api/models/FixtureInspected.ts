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
 * 
 * @export
 * @interface FixtureInspected
 */
export interface FixtureInspected {
    /**
     * 
     * @type {boolean}
     * @memberof FixtureInspected
     */
    has_hidden_compartment_discovered: boolean;
    /**
     * 
     * @type {Array<PerformAction>}
     * @memberof FixtureInspected
     */
    actions: Array<PerformAction>;
    /**
     * 
     * @type {Array<GameEvent>}
     * @memberof FixtureInspected
     */
    events: Array<GameEvent>;
}

export function FixtureInspectedFromJSON(json: any): FixtureInspected {
    return FixtureInspectedFromJSONTyped(json, false);
}

export function FixtureInspectedFromJSONTyped(json: any, ignoreDiscriminator: boolean): FixtureInspected {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'has_hidden_compartment_discovered': json['has_hidden_compartment_discovered'],
        'actions': ((json['actions'] as Array<any>).map(PerformActionFromJSON)),
        'events': ((json['events'] as Array<any>).map(GameEventFromJSON)),
    };
}

export function FixtureInspectedToJSON(value?: FixtureInspected | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'has_hidden_compartment_discovered': value.has_hidden_compartment_discovered,
        'actions': ((value.actions as Array<any>).map(PerformActionToJSON)),
        'events': ((value.events as Array<any>).map(GameEventToJSON)),
    };
}

