/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ListingDTO = {
  id?: number;
  username?: string;
  locationId?: number;
  title?: string;
  briefDescription?: string;
  fullDescription?: string;
  category?: ListingDTO.category;
  price?: number;
  publicationDate?: string;
  expirationDate?: string;
  image?: string;
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
