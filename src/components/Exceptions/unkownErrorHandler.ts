import { ApiError as BackendApiError } from "@/api/backend";
import { AxiosError } from "axios"

import { useRouter } from "vue-router";

const router = useRouter();

/**
 * Finds the correct error message for the given error
 * The message is then put into the error store
 * which an error component can then display
 * @param error The unknown error to handle
 */
const handleUnknownError = (error: any): string => {
    if (error instanceof AxiosError) {
        return error.code!!;
    } else if (error instanceof BackendApiError) {
        if (error.status === 401) {
            setTimeout(() => {
                router.push({name: 'login'});
            }, 100);
        }
        return error.body.detail ?? error.body;
    }
    return 'ContextErrorMessage';
}



export default handleUnknownError;