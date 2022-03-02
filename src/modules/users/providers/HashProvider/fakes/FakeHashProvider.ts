import { HashProviderMethods } from '../models/HashProviderMethods';

export class FakeHashProvider implements HashProviderMethods {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
