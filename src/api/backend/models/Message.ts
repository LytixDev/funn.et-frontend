/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Chat } from './Chat';
import type { User } from './User';

export type Message = {
  id?: number;
  chat?: Chat;
  sender?: User;
  message?: string;
  timestamp?: string;
};
