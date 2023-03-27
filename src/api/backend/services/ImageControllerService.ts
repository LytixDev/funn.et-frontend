/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageResponseDTO } from '../models/ImageResponseDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ImageControllerService {
  /**
   * Uploads images to the server
   * Uploads images to the server and returns a list of image response DTOs.
   * @returns ImageResponseDTO OK
   * @throws ApiError
   */
  public static uploadImages({
    images,
    alts,
  }: {
    images: Array<Blob>;
    alts: Array<string>;
  }): CancelablePromise<Array<ImageResponseDTO>> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/private/images',
      query: {
        images: images,
        alts: alts,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Returns an image from the server.
   * Returns an image from the server as a resource to be downloaded.
   * @returns binary OK
   * @throws ApiError
   */
  public static getImage({ id }: { id: number }): CancelablePromise<Blob> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/public/images/{id}',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Deletes an image from the server
   * Deletes an image from the server and returns a response entity.
   * @returns any OK
   * @throws ApiError
   */
  public static deleteImage({ id }: { id: number }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/private/images/{id}',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }
}
