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
   * Create a chat between a user and a listing.
   * Create a chat between a user and a listing. The chat will be between the user and the listing owner. The user cannot be the listing owner.
   * @returns ChatDTO OK
   * @throws ApiError
   */
  public static createChat({ id }: { id: number }): CancelablePromise<ChatDTO> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/api/v1/private/listings/{id}/chat',
      path: {
        id: id,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Get messages from a chat.
   * Get messages from a chat.
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

  /**
   * Gets chat by listing and username.
   * Gets chat by listing and username. The user must be in the chat, either as the messager or the listing owner.
   * @returns ChatDTO OK
   * @throws ApiError
   */
  public static getChatByListingAndUser({
    id,
    username,
  }: {
    id: number;
    username: string;
  }): CancelablePromise<ChatDTO> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/private/listings/{id}/chat/{username}',
      path: {
        id: id,
        username: username,
      },
      errors: {
        500: `Internal Server Error`,
      },
    });
  }

  /**
   * Get all chats for a user.
   * Get all chats for a user.
   * @returns ChatDTO OK
   * @throws ApiError
   */
  public static getChats(): CancelablePromise<Array<ChatDTO>> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/api/v1/private/chat',
      errors: {
        500: `Internal Server Error`,
      },
    });
  }
}
