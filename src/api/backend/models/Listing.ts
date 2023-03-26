/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';
import type { Chat } from './Chat';
import type { Image } from './Image';
import type { Location } from './Location';
import type { User } from './User';

export type Listing = {
  id?: number;
  user?: User;
  location?: Location;
  title?: string;
  briefDescription?: string;
  fullDescription?: string;
  category?: Category;
  status?: Listing.status;
  price?: number;
  publicationDate?: string;
  expirationDate?: string;
  images?: Array<Image>;
  chats?: Array<Chat>;
};

export namespace Listing {
  export enum status {
    SOLD = 'SOLD',
    ARCHIVED = 'ARCHIVED',
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
  }
}
