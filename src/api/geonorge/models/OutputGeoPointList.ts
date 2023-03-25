/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HitMetadata } from './HitMetadata';
import type { OutputGeoPoint } from './OutputGeoPoint';

export type OutputGeoPointList = {
  metadata?: HitMetadata;
  adresser?: Array<OutputGeoPoint>;
};
