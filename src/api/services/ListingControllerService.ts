/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListingDTOObject } from '../models/ListingDTOObject';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ListingControllerService {
  /**
   * @returns ListingDTOObject OK
   * @throws ApiError
   */
  public static getListing(): CancelablePromise<ListingDTOObject> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/listing',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }
}
