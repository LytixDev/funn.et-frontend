/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListingCreateDTO } from '../models/ListingCreateDTO';
import type { ListingDTO } from '../models/ListingDTO';
import type { ListingUpdateDTO } from '../models/ListingUpdateDTO';
import type { SearchRequest } from '../models/SearchRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ListingControllerService {
  /**
   * @returns ListingDTO OK
   * @throws ApiError
   */
  public static updateListing({
    id,
    formData,
  }: {
    id: number;
    formData?: ListingUpdateDTO;
  }): CancelablePromise<ListingDTO> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/private/listings/{id}',
      path: {
        id: id,
      },
      formData: formData,
      mediaType: 'multipart/form-data',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Deletes a listing with the given id.
   * Deletes a listing with the given id. If the user is not and admin or the user is not the owner of the listing, the listing is not deleted.
   * @returns any OK
   * @throws ApiError
   */
  public static deleteListing({ id }: { id: number }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/private/listings/{id}',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Favorites a listing with the given id.
   * Favorites a listing with the given id. If the listing is already favorited, it is unfavorited.
   * @returns ListingDTO OK
   * @throws ApiError
   */
  public static favoriteOrUnfavoriteListing({ id }: { id: number }): CancelablePromise<ListingDTO> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/private/listings/{id}/favorite',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Get listings by search and filter.
   * Returns all listings in the database. Possible to search for keywords in listing. Keywords share a name with the variable in the Listing class.
   * @returns ListingDTO OK
   * @throws ApiError
   */
  public static getListingsByFilter({
    requestBody,
  }: {
    requestBody: SearchRequest;
  }): CancelablePromise<Array<ListingDTO>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/public/listings',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Creates a listing with the given data.
   * Creates a listing with the given data. Checks that the user exists and that the location exists. Also checks that the listing does not already exist. If the listing is created successfully, it will return the listing with the id and the images uploaded.
   * @returns ListingDTO OK
   * @throws ApiError
   */
  public static createListing({ formData }: { formData?: ListingCreateDTO }): CancelablePromise<ListingDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/private/listings',
      formData: formData,
      mediaType: 'multipart/form-data',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Get a listing by id.
   * Returns a listing with the given id. If user is logged in, it will also return if the user has favorited the listing.
   * @returns ListingDTO OK
   * @throws ApiError
   */
  public static getListing({ id }: { id: number }): CancelablePromise<ListingDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/public/listings/{id}',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Get all listings published by a user.
   * Returns all listings in the database that are published by a user.
   * @returns ListingDTO OK
   * @throws ApiError
   */
  public static getListingsByUser({ username }: { username: string }): CancelablePromise<Array<ListingDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/public/listings/users/{username}',
      path: {
        username: username,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Gets all favorite listings for a user.
   * Gets all favorite listings for a user. If the user is not logged in, an empty set is returned.
   * @returns ListingDTO OK
   * @throws ApiError
   */
  public static getFavoriteListings(): CancelablePromise<Array<ListingDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/private/listings/favorites',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }
}
