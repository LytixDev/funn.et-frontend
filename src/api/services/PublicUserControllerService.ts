/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { UserDTO } from '../models/UserDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PublicUserControllerService {
  /**
   * @returns string OK
   * @throws ApiError
   */
  public static createUser({ user }: { user: User }): CancelablePromise<string> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/public/user',
      query: {
        user: user,
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
    });
  }
}
