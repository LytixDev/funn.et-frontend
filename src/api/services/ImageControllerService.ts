/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageResponseDTO } from '../models/ImageResponseDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ImageControllerService {
  /**
   * @returns ImageResponseDTO OK
   * @throws ApiError
   */
  public static getImage({ id }: { id: number }): CancelablePromise<ImageResponseDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/public/image/{id}',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * @returns string OK
   * @throws ApiError
   */
  public static deleteImage({ id }: { id: number }): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/public/image/{id}',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }
}
