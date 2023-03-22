/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SortRequest = {
  keyWord?: string;
  sortDirection?: SortRequest.sortDirection;
};

export namespace SortRequest {
  export enum sortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
  }
}
