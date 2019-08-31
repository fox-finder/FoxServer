
import { SFTPProviderOptions } from '@fox-finder/sftp-provider';
import { ResourceType, IResource } from './resource';

const resources: IResource[] = [
  {
    type: ResourceType.Local,
    id: 'local-resource-1',
    data: null,
  },
  {
    type: ResourceType.SSH,
    id: 'sftp-resource-1',
    data: {
      host: '47.66.88.168',
      port: 22,
      username: 'root',
      password: 'root',
    } as SFTPProviderOptions,
  },
];

// mock database
export const database = {
  resources,
  apps: [

  ],
  options: {
    type: 'mode',
    // ...
  },
};
