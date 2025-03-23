import HttpStatusCode from '../enums/httpStatusCode.js';
import { BaseError, type DataErrorType, type ErrorType } from './BaseError.js';

export default class Warning extends BaseError {
  readonly statusCode: HttpStatusCode;

  constructor(
    statusCode: HttpStatusCode,
    errors?: string | string[],
    warnings?: ErrorType | ErrorType[],
    dataErrors?: DataErrorType | DataErrorType[],
  ) {
    super(errors, warnings, dataErrors);
    this.name = 'Warning';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, Warning.prototype);
  }
}
