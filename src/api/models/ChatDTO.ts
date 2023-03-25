/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MessageDTO } from './MessageDTO';
import type { UserDTO } from './UserDTO';

export type ChatDTO = {
    id: number;
    messager: UserDTO;
    listingUser: UserDTO;
    listingId: number;
    messages: Array<MessageDTO>;
};
