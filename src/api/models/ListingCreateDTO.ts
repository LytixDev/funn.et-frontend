/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ListingCreateDTO = {
  username: string;
  location?: number;
  title: string;
  briefDescription: string;
  fullDescription?: string;
  category: ListingCreateDTO.category;
  status?: ListingCreateDTO.status;
  price?: number;
  publicationDate?: string;
  expirationDate?: string;
  images?: Array<Blob>;
  imageAlts?: Array<string>;
};

export namespace ListingCreateDTO {
  export enum category {
    ELECTRONICS = 'ELECTRONICS',
    CLOTHING = 'CLOTHING',
    BOOKS = 'BOOKS',
    SPORTS = 'SPORTS',
    FURNITURE = 'FURNITURE',
    OTHER = 'OTHER',
  }

  export enum status {
    SOLD = 'SOLD',
    ARCHIVED = 'ARCHIVED',
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
  }
}
