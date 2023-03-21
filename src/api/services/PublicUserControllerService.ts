/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegisterDTO } from '../models/RegisterDTO';
import type { UserDTO } from '../models/UserDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PublicUserControllerService {
  /**
   * @returns string OK
   * @throws ApiError
   */
  public static createUser({ requestBody }: { requestBody: RegisterDTO }): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/public/user',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * @returns UserDTO OK
   * @throws ApiError
   */
  public static getUser({ username }: { username: string }): CancelablePromise<UserDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/public/user/{username}',
      path: {
        username: username,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }
}
