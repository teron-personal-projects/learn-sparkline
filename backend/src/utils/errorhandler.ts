interface CustomError extends Error {
  status?: number;
  // cause?: string;
}

export const errorHandler = (errObj: object | null, errStatus: number, errString: string ) => {
  if (errObj instanceof Error) {
    const err: CustomError = new Error(errString);
    err.status = errStatus;
    err.cause = errObj.message;

    return err;
  }
}
