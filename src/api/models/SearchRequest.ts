/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FilterRequest } from './FilterRequest';
import type { SortRequest } from './SortRequest';

export type SearchRequest = {
  filterRequests?: Array<FilterRequest>;
  sortRequests?: Array<SortRequest>;
  page?: number;
  size?: number;
};
