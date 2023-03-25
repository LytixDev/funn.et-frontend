/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HitMetadata } from './HitMetadata';
import type { OutputAdresse } from './OutputAdresse';

export type OutputAdresseList = {
  metadata?: HitMetadata;
  adresser?: Array<OutputAdresse>;
};
