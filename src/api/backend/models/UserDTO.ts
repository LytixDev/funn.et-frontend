/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserDTO = {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: UserDTO.role;
};

export namespace UserDTO {
  export enum role {
    USER = 'USER',
    ADMIN = 'ADMIN',
  }
}
