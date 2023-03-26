/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Listing } from './Listing';
import type { Message } from './Message';
import type { User } from './User';

export type Chat = {
  id?: number;
  messager?: User;
  listing?: Listing;
  messages?: Array<Message>;
};
