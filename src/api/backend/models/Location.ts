/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Listing } from './Listing';
import type { PostCode } from './PostCode';

export type Location = {
  id?: number;
  address?: string;
  postCode?: PostCode;
  latitude?: number;
  longitude?: number;
  listings?: Array<Listing>;
};
