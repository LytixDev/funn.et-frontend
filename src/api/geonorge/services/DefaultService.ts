/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OutputAdresseList } from '../models/OutputAdresseList';
import type { OutputGeoPointList } from '../models/OutputGeoPointList';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {
  /**
   * Standard søk.
   * Søk etter adresser. Minst ett søkeparameter må benyttes. For generelle søk så anbefales det å benytte søkeparameteret "sok", og så eventuelt snevre inn resultatet ved å bruke de andre parameterene. For eksempel sok?sok=munkegata&kommunenummer=5001
   * @returns OutputAdresseList OK
   * @throws ApiError
   */
  public static getSok({
    sok,
    fuzzy = false,
    sokemodus,
    adressenavn,
    adressetekst,
    adressetilleggsnavn,
    adressekode,
    nummer,
    bokstav,
    kommunenummer,
    kommunenavn,
    gardsnummer,
    bruksnummer,
    festenummer,
    undernummer,
    bruksenhetsnummer,
    objtype,
    poststed,
    postnummer,
    filtrer,
    utkoordsys = 4258,
    treffPerSide = 10,
    side,
    asciiKompatibel = true,
  }: {
    /**
     * Generelt adressesøk over nesten alle feltene. Wildcard-søk med "*" er støttet (OBS: mellomrom kan ikke erstattes med wildcard). Flere detaljer vil gi mer nøyaktige søk. Bare legg til ekstra opplysninger adskilt med mellomrom. F.eks.: ?sok=munkegata 1 trondheim
     */
    sok?: string;
    /**
     * Utfører et fuzzysøk som finner adresser som ligner på det som det søkes etter. Modifiserer kun feltet "sok". Ikke kompatibelt med bruk av wildcard.
     */
    fuzzy?: boolean;
    /**
     * Modifiserer "sok"-feltet, standardverdi er "AND". Velg om søket skal kreve at hver eneste søkeparameter finnes i treffet, eller om det holder med treff på kun ett parameter. F.eks. vil "?sok=munkegata 1 trondheim&sokemodus=OR" returnere alt som inneholder "munkegata" OG/ELLER tallet "1" OG/ELLER "trondheim".
     */
    sokemodus?: 'AND' | 'OR';
    /**
     * Navn på gate, veg, sti, plass eller område som er ført i matrikkelen (eksempel Sørumvegen).
     */
    adressenavn?: string;
    /**
     * Offisiell adresse som tekststreng (eksempel «Ven, Sørumvegen 45»), men uten eventuelt bruksenhetsnummer for leiligheter
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
    /**
     * Del av offisiell adresse (bruksenhetsnummer) til f.eks en leilighet i flerboligbygg. Bokstaven og de to første tallene angir etasje, de to siste angir leilighetens nummer i etasjen, regnet fra venstre mot høyre. Eksempel: "H0102", "K0101"
     */
    bruksenhetsnummer?: string;
    /**
     * Vegadresse er offisiell adresse i form av et adressenavn og et adressenummer (Storgata 10). Der kommunen ikke har gått over til vegadresser, vil det finnes matrikkeladresse på formen: gårdsnummer/ bruksnummer/ev festenummer-ev undernummer (10/2) Begge adressetypene kan ha bruksenhetsnummer (leiligheter) og adressetilleggsnavn. Begge adressetypene vises som standard, hvis man kun ønsker å se en av de kan man spesifisere adressetypen via dette parameteret.
     */
    objtype?: 'Vegadresse' | 'Matrikkeladresse';
    /**
     * Navn på poststed i henhold til Postens egne lister
     */
    poststed?: string;
    /**
     * Unik identifikasjon av et postnummerområde. Tekstverdi som må bestå av 4 tall. 0340 er for eksempel gyldig, mens 340 er ikke gyldig. Postnummer som identifiserer postboksanlegg er ikke med og vil ikke gi treff.
     */
    postnummer?: string;
    /**
     * Kommaseparert liste med objekter du ikke ønsker å filtrere ut. For å hente ut underobjekter bruk "."-notasjon, f.eks.: &filtrer=adresser.kommunenummer,adresser.representasjonspunkt
     */
    filtrer?: string;
    /**
     * Koordinatsystem som adressegeometrien skal returneres i. Oppgis som srid, f.eks. 25833 eller 3857. Standardinnstilling er 4258
     */
    utkoordsys?: number;
    /**
     * Antall treff per side.
     */
    treffPerSide?: number;
    /**
     * Sidenummeret som vises. Første side = 0
     */
    side?: number;
    /**
     * Garanterer at dataene som returneres er ascii-kompatible.
     */
    asciiKompatibel?: boolean;
  }): CancelablePromise<OutputAdresseList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/sok',
      query: {
        sok: sok,
        fuzzy: fuzzy,
        sokemodus: sokemodus,
        adressenavn: adressenavn,
        adressetekst: adressetekst,
        adressetilleggsnavn: adressetilleggsnavn,
        adressekode: adressekode,
        nummer: nummer,
        bokstav: bokstav,
        kommunenummer: kommunenummer,
        kommunenavn: kommunenavn,
        gardsnummer: gardsnummer,
        bruksnummer: bruksnummer,
        festenummer: festenummer,
        undernummer: undernummer,
        bruksenhetsnummer: bruksenhetsnummer,
        objtype: objtype,
        poststed: poststed,
        postnummer: postnummer,
        filtrer: filtrer,
        utkoordsys: utkoordsys,
        treffPerSide: treffPerSide,
        side: side,
        asciiKompatibel: asciiKompatibel,
      },
    });
  }

  /**
   * Geografisk punktsøk.
   * Søk etter adresser innen en viss radius. Sortert etter distanse fra punkt. Respons inkluderer distansen fra punktet i meter. <p>F.eks. punktsok?lat=60&lon=11&radius=1000</p>
   * @returns OutputGeoPointList OK
   * @throws ApiError
   */
  public static getPunktsok({
    lat,
    lon,
    radius,
    koordsys = 4258,
    utkoordsys = 4258,
    filtrer,
    treffPerSide = 10,
    side,
    asciiKompatibel = true,
  }: {
    /**
     * Geografiske latitude/breddegrad/nordlige koordinater, med mindre annet er spesifisert.
     */
    lat: number;
    /**
     * Geografiske longitude/lengdegrad/østlige koordinater, med mindre annet er spesifisert.
     */
    lon: number;
    /**
     * Radius for søket i hele meter
     */
    radius: number;
    /**
     * Koordinatsystem for punktet du søker etter. Oppgis som srid, f.eks. 25833 eller 3857. Standardinnstilling er 4258
     */
    koordsys?: number;
    /**
     * Koordinatsystem som adressegeometrien skal returneres i. Oppgis som srid, f.eks. 25833 eller 3857. Standardinnstilling er 4258
     */
    utkoordsys?: number;
    /**
     * Kommaseparert liste med objekter du ikke ønsker å filtrere ut. For å hente ut underobjekter bruk "."-notasjon, f.eks.: &filtrer=adresser.kommunenummer,adresser.representasjonspunkt
     */
    filtrer?: string;
    /**
     * Antall treff per side.
     */
    treffPerSide?: number;
    /**
     * Sidenummeret som vises. Første side = 0
     */
    side?: number;
    /**
     * Garanterer at dataene som returneres er ascii-kompatible.
     */
    asciiKompatibel?: boolean;
  }): CancelablePromise<OutputGeoPointList> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/punktsok',
      query: {
        lat: lat,
        lon: lon,
        radius: radius,
        koordsys: koordsys,
        utkoordsys: utkoordsys,
        filtrer: filtrer,
        treffPerSide: treffPerSide,
        side: side,
        asciiKompatibel: asciiKompatibel,
      },
    });
  }
}
