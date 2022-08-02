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


import * as runtime from '../runtime';
import {
    GeneratePlayerCharacter,
    GeneratePlayerCharacterFromJSON,
    GeneratePlayerCharacterToJSON,
    GeneratedPlayerCharacter,
    GeneratedPlayerCharacterFromJSON,
    GeneratedPlayerCharacterToJSON,
    PlayerCharacter,
    PlayerCharacterFromJSON,
    PlayerCharacterToJSON,
} from '../models';

export interface GeneratePcRequest {
    generatePlayerCharacter: GeneratePlayerCharacter;
}

export interface GetPcRequest {
    id: string;
}

export interface SetPcAsCurrentRequest {
    id: string;
}

/**
 * PlayerCharactersApi - interface
 * 
 * @export
 * @interface PlayerCharactersApiInterface
 */
export interface PlayerCharactersApiInterface {
    /**
     * 
     * @summary Generate and save a new player_character for the user. If user has no player set as current, this one gets set as the current.
     * @param {GeneratePlayerCharacter} generatePlayerCharacter 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlayerCharactersApiInterface
     */
    generatePcRaw(requestParameters: GeneratePcRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GeneratedPlayerCharacter>>;

    /**
     * Generate and save a new player_character for the user. If user has no player set as current, this one gets set as the current.
     */
    generatePc(requestParameters: GeneratePcRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GeneratedPlayerCharacter>;

    /**
     * 
     * @summary Check the status of the current player character.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlayerCharactersApiInterface
     */
    getCurrentPcRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<PlayerCharacter>>;

    /**
     * Check the status of the current player character.
     */
    getCurrentPc(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<PlayerCharacter>;

    /**
     * 
     * @summary Check the player character for the user with specified ID.
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlayerCharactersApiInterface
     */
    getPcRaw(requestParameters: GetPcRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<PlayerCharacter>>;

    /**
     * Check the player character for the user with specified ID.
     */
    getPc(requestParameters: GetPcRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<PlayerCharacter>;

    /**
     * # Example  Call `/my_username/player_characters` to retrieve all player character ids for my_username
     * @summary Get IDs of all player characters
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlayerCharactersApiInterface
     */
    getPcIdsRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<string>>>;

    /**
     * # Example  Call `/my_username/player_characters` to retrieve all player character ids for my_username
     * Get IDs of all player characters
     */
    getPcIds(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<string>>;

    /**
     * 
     * @summary Set the specified player character as the current one for any actions in a game.
     * @param {string} id 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PlayerCharactersApiInterface
     */
    setPcAsCurrentRaw(requestParameters: SetPcAsCurrentRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<string>>;

    /**
     * Set the specified player character as the current one for any actions in a game.
     */
    setPcAsCurrent(requestParameters: SetPcAsCurrentRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<string>;

}

/**
 * 
 */
export class PlayerCharactersApi extends runtime.BaseAPI implements PlayerCharactersApiInterface {

    /**
     * Generate and save a new player_character for the user. If user has no player set as current, this one gets set as the current.
     */
    async generatePcRaw(requestParameters: GeneratePcRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<GeneratedPlayerCharacter>> {
        if (requestParameters.generatePlayerCharacter === null || requestParameters.generatePlayerCharacter === undefined) {
            throw new runtime.RequiredError('generatePlayerCharacter','Required parameter requestParameters.generatePlayerCharacter was null or undefined when calling generatePc.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["UNDERWORLD-TOKEN"] = this.configuration.apiKey("UNDERWORLD-TOKEN"); // UnderworldApiKeyAuthorization authentication
        }

        const response = await this.request({
            path: `/pcs/generate`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GeneratePlayerCharacterToJSON(requestParameters.generatePlayerCharacter),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GeneratedPlayerCharacterFromJSON(jsonValue));
    }

    /**
     * Generate and save a new player_character for the user. If user has no player set as current, this one gets set as the current.
     */
    async generatePc(requestParameters: GeneratePcRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<GeneratedPlayerCharacter> {
        const response = await this.generatePcRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Check the status of the current player character.
     */
    async getCurrentPcRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<PlayerCharacter>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["UNDERWORLD-TOKEN"] = this.configuration.apiKey("UNDERWORLD-TOKEN"); // UnderworldApiKeyAuthorization authentication
        }

        const response = await this.request({
            path: `/pcs/current`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayerCharacterFromJSON(jsonValue));
    }

    /**
     * Check the status of the current player character.
     */
    async getCurrentPc(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<PlayerCharacter> {
        const response = await this.getCurrentPcRaw(initOverrides);
        return await response.value();
    }

    /**
     * Check the player character for the user with specified ID.
     */
    async getPcRaw(requestParameters: GetPcRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<PlayerCharacter>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getPc.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["UNDERWORLD-TOKEN"] = this.configuration.apiKey("UNDERWORLD-TOKEN"); // UnderworldApiKeyAuthorization authentication
        }

        const response = await this.request({
            path: `/pcs/{id}/check`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlayerCharacterFromJSON(jsonValue));
    }

    /**
     * Check the player character for the user with specified ID.
     */
    async getPc(requestParameters: GetPcRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<PlayerCharacter> {
        const response = await this.getPcRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * # Example  Call `/my_username/player_characters` to retrieve all player character ids for my_username
     * Get IDs of all player characters
     */
    async getPcIdsRaw(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<Array<string>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["UNDERWORLD-TOKEN"] = this.configuration.apiKey("UNDERWORLD-TOKEN"); // UnderworldApiKeyAuthorization authentication
        }

        const response = await this.request({
            path: `/pcs/ids`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * # Example  Call `/my_username/player_characters` to retrieve all player character ids for my_username
     * Get IDs of all player characters
     */
    async getPcIds(initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<Array<string>> {
        const response = await this.getPcIdsRaw(initOverrides);
        return await response.value();
    }

    /**
     * Set the specified player character as the current one for any actions in a game.
     */
    async setPcAsCurrentRaw(requestParameters: SetPcAsCurrentRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling setPcAsCurrent.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["UNDERWORLD-TOKEN"] = this.configuration.apiKey("UNDERWORLD-TOKEN"); // UnderworldApiKeyAuthorization authentication
        }

        const response = await this.request({
            path: `/pcs/{id}/set_as_current`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Set the specified player character as the current one for any actions in a game.
     */
    async setPcAsCurrent(requestParameters: SetPcAsCurrentRequest, initOverrides?: RequestInit | runtime.InitOverideFunction): Promise<string> {
        const response = await this.setPcAsCurrentRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
