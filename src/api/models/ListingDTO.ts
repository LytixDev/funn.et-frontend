/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ListingDTO = {
  id?: number;
  username?: string;
  title?: string;
  brief_description?: string;
  full_description?: string;
  category?: ListingDTO.category;
  price?: number;
  publicationDate?: string;
  expirationDate?: string;
  image?: Array<string>;
};

export namespace ListingDTO {
  export enum category {
    ELECTRONICS = 'ELECTRONICS',
    CLOTHING = 'CLOTHING',
    BOOKS = 'BOOKS',
    SPORTS = 'SPORTS',
    FURNITURE = 'FURNITURE',
    OTHER = 'OTHER',
  }
}
