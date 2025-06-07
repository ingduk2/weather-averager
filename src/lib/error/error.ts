export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statucCode: number = 500) {
    super(message);
    this.statusCode = statucCode;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
  }
}
