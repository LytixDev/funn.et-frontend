/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GrantedAuthority } from './GrantedAuthority';

export type User = {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  role?: User.role;
  enabled?: boolean;
  accountNonExpired?: boolean;
  authorities?: Array<GrantedAuthority>;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
};

export namespace User {
  export enum role {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }
}
