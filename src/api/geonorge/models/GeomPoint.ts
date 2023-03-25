/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GeomPoint = {
  /**
   * Koordinatsystem til punktet. Angitt vha EPSG-kode.
   */
  epsg?: string;
  /**
   * Geografiske latitude/breddegrad/nordlige koordinater, med mindre annet er spesifisert.
   */
  lat: number;
  /**
   * Geografiske longitude/lengdegrad/østlige koordinater, med mindre annet er spesifisert.
   */
  lon: number;
};
