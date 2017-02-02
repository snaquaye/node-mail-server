class HttpError extends Error {
  /**
   * Creates an instance of HttpError.
   * 
   * @param {string} message
   * 
   * @memberOf HttpError
   */
  constructor(message) {
    super(message);
  }

  /**
   * Sets statusCode
   * 
   * @param {number} statusCode The error http status code, e.g. 500, 400, 401, 403, 409 etc.
   * 
   * @memberOf HttpError
   */
  set statusCode(statusCode = null) {
    this._statusCode = statusCode || 500;
    return this;
  }

  /**
   * Returns the error http status code
   * 
   * @return {number}
   * @memberOf HttpError
   */
  get statusCode() {
    return this._statusCode;
  }
}

module.exports = HttpError;