export class ErrorResponse {
    constructor(public message: string, public statusCode: number = 500) {}
  }