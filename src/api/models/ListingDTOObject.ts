/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ListingDTOObject = {
  id?: number;
  username?: string;
  locationId?: number;
  title?: string;
  briefDescription?: string;
  fullDescription?: string;
  category?: ListingDTOObject.category;
  price?: number;
  publicationDate?: string;
  expirationDate?: string;
  image?: Array<any>;
};

export namespace ListingDTOObject {
  export enum category {
    ELECTRONICS = 'ELECTRONICS',
    CLOTHING = 'CLOTHING',
    BOOKS = 'BOOKS',
    SPORTS = 'SPORTS',
    FURNITURE = 'FURNITURE',
    OTHER = 'OTHER',
  }
}
