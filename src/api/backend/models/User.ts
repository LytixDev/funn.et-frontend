/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Chat } from './Chat';
import type { GrantedAuthority } from './GrantedAuthority';
import type { Listing } from './Listing';
import type { Message } from './Message';

export type User = {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  listings?: Array<Listing>;
  chats?: Array<Chat>;
  messages?: Array<Message>;
  favoriteListings?: Array<Listing>;
  role?: User.role;
  enabled?: boolean;
  authorities?: Array<GrantedAuthority>;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
};

export namespace User {
  export enum role {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }
}
