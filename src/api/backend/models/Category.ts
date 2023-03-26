/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Listing } from './Listing';

export type Category = {
  id?: number;
  name?: string;
  listings?: Array<Listing>;
};
