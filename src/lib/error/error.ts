export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}
