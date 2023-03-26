/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location } from './Location';

export type PostCode = {
  postCode?: number;
  city?: string;
  locations?: Array<Location>;
};
