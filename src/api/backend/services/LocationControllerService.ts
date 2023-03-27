/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LocationCreateDTO } from '../models/LocationCreateDTO';
import type { LocationResponseDTO } from '../models/LocationResponseDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LocationControllerService {
  /**
   * Update location by id
   * Updates a location by id if it exists in the database, and returns the updated location. Only admins can update locations.
   * @returns LocationResponseDTO OK
   * @throws ApiError
   */
  public static updateLocationById({
    id,
    requestBody,
  }: {
    id: number;
    requestBody: LocationResponseDTO;
  }): CancelablePromise<LocationResponseDTO> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/private/locations/{id}',
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Delete location by id
   * Deletes a location by id.
   * @returns any OK
   * @throws ApiError
   */
  public static deleteLocation({ id }: { id: number }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/private/locations/{id}',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Create location
   * Creates a location.
   * @returns LocationResponseDTO OK
   * @throws ApiError
   */
  public static createLocation({
    requestBody,
  }: {
    requestBody: LocationCreateDTO;
  }): CancelablePromise<LocationResponseDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/private/locations',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Get all locations
   * Returns all locations in the database.
   * @returns LocationResponseDTO OK
   * @throws ApiError
   */
  public static getAllLocations(): CancelablePromise<Array<LocationResponseDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/public/locations',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Get location by id
   * Returns a location by id if it exists in the database.
   * @returns LocationResponseDTO OK
   * @throws ApiError
   */
  public static getLocationById({ id }: { id: number }): CancelablePromise<LocationResponseDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/public/locations/{id}',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }
}
