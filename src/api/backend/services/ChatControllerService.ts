/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatDTO } from '../models/ChatDTO';
import type { MessageDTO } from '../models/MessageDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ChatControllerService {
  /**
   * @returns ChatDTO OK
   * @throws ApiError
   */
  public static createChat({ id }: { id: number }): CancelablePromise<ChatDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/private/listing/{id}/chat',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * @returns ChatDTO OK
   * @throws ApiError
   */
  public static getChat({ id }: { id: number }): CancelablePromise<ChatDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/private/chat/{id}',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * @returns MessageDTO OK
   * @throws ApiError
   */
  public static sendMessage({
    id,
    requestBody,
  }: {
    id: number;
    requestBody: MessageDTO;
  }): CancelablePromise<MessageDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/private/chat/{id}',
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
}
