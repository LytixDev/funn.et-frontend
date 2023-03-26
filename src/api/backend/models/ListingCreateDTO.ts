/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Category } from './Category';

export type ListingCreateDTO = {
  location?: number;
  title: string;
  briefDescription: string;
  fullDescription?: string;
  category: Category;
  status?: ListingCreateDTO.status;
  price?: number;
  publicationDate?: string;
  expirationDate?: string;
  images?: Array<Blob>;
  imageAlts?: Array<string>;
};

export namespace ListingCreateDTO {
  export enum status {
    SOLD = 'SOLD',
    ARCHIVED = 'ARCHIVED',
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
  }
}
