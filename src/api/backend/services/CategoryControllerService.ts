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
   * Updates a category.
   * Updates a category if it exists in the database.
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
   * Deletes a category.
   * Deletes a category if it exists in the database.
   * @returns string OK
   * @throws ApiError
   */
  public static deleteCategory({ id }: { id: number }): CancelablePromise<string> {
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
   * Creates a category.
   * Creates a category if it does not already exist in the database.
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
   * Gets all categories
   * Gets all categories that are available in the database.
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
   * Gets a category by id.
   * Gets a category by id that is given if it is available in the database.
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
