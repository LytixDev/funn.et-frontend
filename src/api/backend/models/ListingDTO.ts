/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ImageResponseDTO } from './ImageResponseDTO';

export type ListingDTO = {
  id: number;
  username: string;
  location?: number;
  title: string;
  briefDescription: string;
  fullDescription?: string;
  category: ListingDTO.category;
  price?: number;
  publicationDate?: string;
  expirationDate?: string;
  imageResponse?: Array<ImageResponseDTO>;
  isFavorite?: boolean;
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
