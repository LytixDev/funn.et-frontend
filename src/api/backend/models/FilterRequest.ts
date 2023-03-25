/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type FilterRequest = {
  keyWord?: string;
  operator?: FilterRequest.operator;
  fieldType?: FilterRequest.fieldType;
  value?: any;
  valueTo?: any;
  values?: Array<any>;
};

export namespace FilterRequest {
  export enum operator {
    EQUAL = 'EQUAL',
    NOT_EQUAL = 'NOT_EQUAL',
    GREATER_THAN = 'GREATER_THAN',
    GREATER_THAN_EQUAL = 'GREATER_THAN_EQUAL',
    LESS_THAN = 'LESS_THAN',
    LESS_THAN_EQUAL = 'LESS_THAN_EQUAL',
    BETWEEN = 'BETWEEN',
    IN = 'IN',
    NOT_IN = 'NOT_IN',
    LIKE = 'LIKE',
  }

  export enum fieldType {
    BOOLEAN = 'BOOLEAN',
    STRING = 'STRING',
    INTEGER = 'INTEGER',
    LONG = 'LONG',
    DOUBLE = 'DOUBLE',
    FLOAT = 'FLOAT',
    CHARACTER = 'CHARACTER',
    DATE = 'DATE',
  }
}
