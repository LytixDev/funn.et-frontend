/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategoryCreateDTO } from '../models/CategoryCreateDTO';
import type { CategoryDTO } from '../models/CategoryDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CategoryControllerService {
  /**
   * @returns CategoryDTO OK
   * @throws ApiError
   */
  public static updateCategory({
    id,
    requestBody,
  }: {
    id: number;
    requestBody: CategoryDTO;
  }): CancelablePromise<CategoryDTO> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/api/v1/private/categories/{id}',
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
  public static deleteCategory({ id }: { id: number }): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/api/v1/private/categories/{id}',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * @returns CategoryDTO OK
   * @throws ApiError
   */
  public static createCategory({ requestBody }: { requestBody: CategoryCreateDTO }): CancelablePromise<CategoryDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/private/categories',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * @returns CategoryDTO OK
   * @throws ApiError
   */
  public static getAllCategories(): CancelablePromise<Array<CategoryDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/public/categories',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * @returns CategoryDTO OK
   * @throws ApiError
   */
  public static getCategoryById({ id }: { id: number }): CancelablePromise<CategoryDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/public/categories/{id}',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }
}
