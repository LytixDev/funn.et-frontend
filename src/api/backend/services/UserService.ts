/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegisterDTO } from '../models/RegisterDTO';
import type { UserDTO } from '../models/UserDTO';
import type { UserPatchDTO } from '../models/UserPatchDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {
  /**
   * Create a new user
   * Create a new user
   * @returns string OK
   * @throws ApiError
   */
  public static createUser({ requestBody }: { requestBody: RegisterDTO }): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/public/users',
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Update the user with the given username
   * Update the user with the given username
   * @returns UserDTO OK
   * @throws ApiError
   */
  public static updateUser({
    username,
    requestBody,
  }: {
    username: string;
    requestBody: UserPatchDTO;
  }): CancelablePromise<UserDTO> {
    return __request(OpenAPI, {
      method: 'PATCH',
      url: '/api/v1/private/users/{username}',
      path: {
        username: username,
      },
      body: requestBody,
      mediaType: 'application/json',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Get a user by username
   * Get a user by username
   * @returns UserDTO OK
   * @throws ApiError
   */
  public static getUser({ username }: { username: string }): CancelablePromise<UserDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/public/users/{username}',
      path: {
        username: username,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Get the authenticated user
   * Get the authenticated user
   * @returns UserDTO OK
   * @throws ApiError
   */
  public static getUser1(): CancelablePromise<UserDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/private/users/me',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }
}
