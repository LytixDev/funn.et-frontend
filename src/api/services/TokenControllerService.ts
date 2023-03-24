/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthenticateDTO } from '../models/AuthenticateDTO';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TokenControllerService {

    /**
     * @returns string Created
     * @throws ApiError
     */
    public static generateToken({
requestBody,
}: {
requestBody: AuthenticateDTO,
}): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/public/token',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `Internal Server Error`,
            },
        });
    }

}
