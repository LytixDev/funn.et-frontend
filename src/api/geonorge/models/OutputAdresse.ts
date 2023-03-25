/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GeomPoint } from './GeomPoint';

export type OutputAdresse = {
  /**
   * Navn på gate, veg, sti, plass eller område som er ført i matrikkelen (eksempel Sørumvegen).
   */
  adressenavn?: string;
  /**
   * Del av offisiell adresse, men uten bruksenhetsnummer som ligger til bruksenheter/boliger (ligger her som egenskap til vegadressen) Eksempel: "Storgata 2B" eller "123/4-2" Der det i tillegg er adressetilleggsnavn: "Haugen, Storgata 2B" eller "Midtgard, 123/4-2"
   */
  adressetekst?: string;
  /**
   * Nedarvet bruksnavn, navn på en institusjon eller bygning eller grend brukt som del av den offisielle adressen
   */
  adressetilleggsnavn?: string;
  /**
   * Nummer som entydig identifiserer adresserbare gater, veger, stier, plasser og områder som er ført i matrikkelen innen kommunen
   */
  adressekode?: number;
  /**
   * Del av adressenummer (husnummer) som er et nummer og eventuelt en bokstav, f.eks 23B
   */
  nummer?: number;
  /**
   * Del av adressenummer (husnummer) som er et nummer og en eventuelt en bokstav, f.eks 23B. For å kun søke på adresser uten noen bokstav så inkluderer man "bokstav=" i søkestrengen uten å fylle inn noen verdi.
   */
  bokstav?: string;
  /**
   * Nummerering av kommunen i henhold til Statistisk sentralbyrå sin offisielle liste. Tekstverdi som må bestå av 4 tall. 0301 er for eksempel gyldig, mens 301 er ikke gyldig.
   */
  kommunenummer?: string;
  /**
   * Navn (norsk) på en kommune
   */
  kommunenavn?: string;
  /**
   * Del av en matrikkeladresse der vegadresse ikke er innført, - eller vegadressens knytning til matrikkelenhet (grunneiendom eller feste, - gir her ikke knyting mot seksjon)
   */
  gardsnummer?: number;
  /**
   * Del av en matrikkeladresse der vegadresse ikke er innført, - eller vegadressens knytning til matrikkelenhet (grunneiendom eller feste, - gir her ikke knyting mot seksjon)
   */
  bruksnummer?: number;
  /**
   * Del av en matrikkeladresse der vegadresse ikke er innført, - eller vegadressens knytning til matrikkelenhet (grunneiendom eller feste, - gir her ikke knytning mot seksjon)
   */
  festenummer?: number;
  /**
   * Fortløpende nummerering av matrikkeladresser med samme gårds-, bruks- og festenummer.
   */
  undernummer?: number;
  bruksenhetsnummer?: Array<string>;
  /**
   * Vegadresse er offisiell adresse i form av et adressenavn og et adressenummer (Storgata 10). Der kommunen ikke har gått over til vegadresser, vil det finnes matrikkeladresse på formen: gårdsnummer/ bruksnummer/ev festenummer-ev undernummer (10/2) Begge adressetypene kan ha bruksenhetsnummer (leiligheter) og adressetilleggsnavn. Begge adressetypene vises som standard, hvis man kun ønsker å se en av de kan man spesifisere adressetypen via dette parameteret.
   */
  objtype?: OutputAdresse.objtype;
  /**
   * Navn på poststed i henhold til Postens egne lister
   */
  poststed?: string;
  /**
   * Unik identifikasjon av et postnummerområde. Tekstverdi som må bestå av 4 tall. 0340 er for eksempel gyldig, mens 340 er ikke gyldig. Postnummer som identifiserer postboksanlegg er ikke med og vil ikke gi treff.
   */
  postnummer?: string;
  /**
   * Del av offisiell adresse, men uten bruksenhetsnummer som ligger til bruksenheter/boliger og adressetilleggsnavn Eksempel: "Storgata 2B" eller "123/4-2"
   */
  adressetekstutenadressetilleggsnavn?: string;
  /**
   * Angivelse om stedfestingen (koordinatene) er kontrollert og funnet i orden (verifisert)
   */
  stedfestingverifisert?: boolean;
  representasjonspunkt?: GeomPoint;
  /**
   * Dato for siste endring på objektdataene
   */
  oppdateringsdato?: string;
};

export namespace OutputAdresse {
  /**
   * Vegadresse er offisiell adresse i form av et adressenavn og et adressenummer (Storgata 10). Der kommunen ikke har gått over til vegadresser, vil det finnes matrikkeladresse på formen: gårdsnummer/ bruksnummer/ev festenummer-ev undernummer (10/2) Begge adressetypene kan ha bruksenhetsnummer (leiligheter) og adressetilleggsnavn. Begge adressetypene vises som standard, hvis man kun ønsker å se en av de kan man spesifisere adressetypen via dette parameteret.
   */
  export enum objtype {
    VEGADRESSE = 'Vegadresse',
    MATRIKKELADRESSE = 'Matrikkeladresse',
  }
}
