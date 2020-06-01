import bcrypt from "bcryptjs";
import { BaseService } from "./Base";
import { ServiceContainer } from '@services/';

export class Crypto extends BaseService {
  constructor(app: ServiceContainer) {
    super(app);
  }

  /**
   * Checks a clear password against its stored hash
   *
   * @param {String} password
   * @param {String} hash
   * @returns {Boolean}
   */
  checkPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  /**
   * Computes a cryptographic hash of the given value
   * Returns an string containing the hash and the salt:
   *
   *   (binary)[ hash 48 bytes ][ salt 16 bytes ] = 64 bytes
   *
   * @param {string} clear - the value to hash
   * @returns {String}
   */
  async password(clear: string) {
    const salt = await bcrypt.genSalt(16);
    return await bcrypt.hash(clear, salt);
  }
}
