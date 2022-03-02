import { hash, compare } from 'bcryptjs';
import { HashProviderMethods } from '../models/HashProviderMethods';

export class BCryptHashProvider implements HashProviderMethods {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
