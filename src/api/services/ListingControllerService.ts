/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListingDTO } from '../models/ListingDTO';
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
    requestBody,
  }: {
    id: number;
    requestBody: ListingDTO;
  }): CancelablePromise<ListingDTO> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/private/listings/{id}',
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
   * Get listings by search and filter
   * Returns all listings in the database. Possible to search for keywords in listing
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
   * @returns ListingDTO OK
   * @throws ApiError
   */
  public static createListing({ requestBody }: { requestBody: ListingDTO }): CancelablePromise<ListingDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/private/listings',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
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
}
