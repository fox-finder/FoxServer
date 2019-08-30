
import { FoxFileProvider } from '@fox-finder/base';
import { NodeFsProvider } from '@fox-finder/node-fs-provider';
import { ResourceType, getResource } from '../resource';

const ProviderFactory = {
  [ResourceType.Local]: NodeFsProvider,
  // [ResourceType.SSH]: SSHFileProvider,
};

interface IFileProviderMapItem {
  provider: FoxFileProvider;
  lastConsumeAt: number;
}

export const providers: Map<string, IFileProviderMapItem> = new Map();

export function getProviderByResourceId(resourceId: string): Promise<FoxFileProvider> {

  const taregt = providers.get(resourceId);
  if (taregt) {
    return Promise.resolve(taregt.provider);
  }

  const { type, data } = getResource(resourceId);
  const FileProvider = ProviderFactory[type];
  if (!FileProvider) {
    return Promise.reject('ProviderFactory unavailable!');
  }

  providers.set(resourceId, {
    lastConsumeAt: Date.now(),
    provider: new FileProvider(data),
  });

  return getProviderByResourceId(resourceId);
}
