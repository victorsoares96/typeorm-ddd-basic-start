export interface StorageProviderMethods {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
