/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListingDTO } from '../models/ListingDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ListingControllerService {
  /**
   * @returns ListingDTO OK
   * @throws ApiError
   */
  public static getListing(): CancelablePromise<ListingDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/listing',
    });
  }
}
