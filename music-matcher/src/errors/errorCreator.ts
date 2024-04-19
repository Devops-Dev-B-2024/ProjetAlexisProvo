export class CustomError extends Error {
  status: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}

export const throwError = (status: number, message: string) => {
  throw new CustomError(message, status);
};
