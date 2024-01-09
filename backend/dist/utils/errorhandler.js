export const errorHandler = (errObj, errStatus, errString) => {
    if (errObj instanceof Error) {
        const err = new Error(errString);
        err.status = errStatus;
        err.cause = errObj.message;
        return err;
    }
};
