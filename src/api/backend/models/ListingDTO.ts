/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CategoryDTO } from './CategoryDTO';
import type { ImageResponseDTO } from './ImageResponseDTO';

export type ListingDTO = {
  id: number;
  username: string;
  location?: number;
  title: string;
  briefDescription: string;
  fullDescription?: string;
  category: CategoryDTO;
  status: ListingDTO.status;
  price?: number;
  publicationDate?: string;
  expirationDate?: string;
  imageResponse?: Array<ImageResponseDTO>;
  isFavorite?: boolean;
};

export namespace ListingDTO {
  export enum status {
    SOLD = 'SOLD',
    ARCHIVED = 'ARCHIVED',
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
  }
}
