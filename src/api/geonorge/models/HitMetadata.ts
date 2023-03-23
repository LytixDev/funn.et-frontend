/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type HitMetadata = {
  /**
   * Hvilket resultatnummer det første objektet du ser har.
   */
  viserFra?: number;
  /**
   * Hvilket resultatnummer det siste objektet du ser har.
   */
  viserTil?: number;
  /**
   * Antall treff som søket returnerte.
   */
  totaltAntallTreff?: number;
  /**
   * Søkestrengen som ble sendt inn til API-et.
   */
  sokeStreng?: string;
  /**
   * Antall treff per side.
   */
  treffPerSide?: number;
  /**
   * Garanterer at dataene som returneres er ascii-kompatible.
   */
  asciiKompatibel?: boolean;
  /**
   * Sidenummeret som vises. Første side = 0
   */
  side?: number;
};
