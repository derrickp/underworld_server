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


/**
 * 
 * @export
 */
export const ExitType = {
    Door: 'door',
    HoleInTheWall: 'hole_in_the_wall',
    OpeningToTheVoid: 'opening_to_the_void',
    HoleInTheFloor: 'hole_in_the_floor',
    StaircaseUp: 'staircase_up',
    StaircaseDown: 'staircase_down',
    Hallway: 'hallway',
    DugOutTunnelEntrance: 'dug_out_tunnel_entrance'
} as const;
export type ExitType = typeof ExitType[keyof typeof ExitType];


export function ExitTypeFromJSON(json: any): ExitType {
    return ExitTypeFromJSONTyped(json, false);
}

export function ExitTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExitType {
    return json as ExitType;
}

export function ExitTypeToJSON(value?: ExitType | null): any {
    return value as any;
}

