import { container } from 'tsyringe';
import uploadConfig from '@config/upload';

import { DiskStorageProvider } from './implementations/DiskStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import { StorageProviderMethods } from './models/StorageProviderMethods';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<StorageProviderMethods>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
