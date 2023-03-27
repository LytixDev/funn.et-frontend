import { ApiError as BackendApiError } from "@/api/backend";
import { AxiosError } from "axios"

import { useRouter } from "vue-router";
import { useErrorStore } from "@/stores/ErrorStore";

const router = useRouter();
const errorStore = useErrorStore();

/**
 * Finds the correct error message for the given error
 * The message is then put into the error store
 * which an error component can then display
 * @param error The unknown error to handle
 * @returns 
 */
const unknownErrorHandler = (error: any) => {
    if (error instanceof AxiosError) {
        return error.code!!;
    } else if (error instanceof BackendApiError) {
        if (error.status === 401) {
            setTimeout(() => {
                router.push({name: 'login'});
            }, 1000);
        }
        return setInErrorStore(error.body.detail ?? error.body);
    }
    return setInErrorStore('ContextErrorMessage');
}

const setInErrorStore = (error: string) => {
    errorStore.addError(error);
}


export default unknownErrorHandler;