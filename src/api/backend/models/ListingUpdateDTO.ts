/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';

export type ListingUpdateDTO = {
  location?: number;
  title: string;
  briefDescription: string;
  fullDescription?: string;
  category: Category;
  status?: ListingUpdateDTO.status;
  price?: number;
  publicationDate?: string;
  expirationDate?: string;
  images?: Array<Blob>;
  imageAlts?: Array<string>;
  username?: string;
  imagesToKeep?: Array<number>;
};

export namespace ListingUpdateDTO {
  export enum status {
    SOLD = 'SOLD',
    ARCHIVED = 'ARCHIVED',
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
  }
}
