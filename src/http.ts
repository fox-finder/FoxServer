
export enum HttpStatus {
  Success = 'success',
  Error = 'error',
}

// response data builder
export function getSuccessResponse(data: any, message = 'success!') {
  return {
    data,
    message,
    status: HttpStatus.Success,
  };
}

export function getFailedResponse(message: string) {
  return {
    message,
    status: HttpStatus.Error,
  };
}