import { BaseService } from "./Base";
import { ServiceContainer } from "@services/";

export class ResponseService extends BaseService {
  constructor(app: ServiceContainer) {
    super(app);
  }

  /**
   * @private
   * @param {Object} body
   * @param {number} statusCode
   * @param {string} headers
   * @returns {Object}
   */
  getResponse(
    body: string,
    statusCode = 200,
    headers: Record<string, any> | null = null
  ) {
    const response = {
      headers,
      statusCode,
      body
    };
    return response;
  }

  /**
   * Build http response
   *
   * @public
   * @param {Object} body
   * @param {number} statusCode = 200
   * @param {string} additionalHeaders = null
   * @returns {string}
   */
  getJsonResponse(
    body: Record<string, any>,
    statusCode = 200,
    additionalHeaders = {}
  ) {
    let headers = {
      "access-control-allow-credentials": true,
      // Required for CORS support to work
      "access-control-allow-origin": "*",
      // Required for cookies, authorization headers with HTTPS
      "content-type": "application/json",
      ...additionalHeaders
    };
    return this.getResponse(JSON.stringify(body), statusCode, headers);
  }
}
