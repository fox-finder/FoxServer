
import { ResourceType, IResource } from './resource';

const resources: IResource[] = [
  {
    type: ResourceType.Local,
    id: 'local-resource-1',
    data: null,
  },
  {
    type: ResourceType.SSH,
    id: 'ssh-resource-1',
    data: {
      host: '47.36.18.214',
      port: 22,
      username: 'root',
      password: 'root',
    },
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
