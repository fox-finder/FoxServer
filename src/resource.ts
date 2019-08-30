
import { database } from './database';

export enum ResourceType {
  Local = 'local',
  SSH = 'ssh',
  S3 = 's3',
  GoogleDriver = 'googleDriver',
}

export interface IResource {
  type: ResourceType;
  id: string;
  data: any;
}

export function getResource(resourceId: string): IResource {
  return database.resources.find(resource => {
    return resource.id === resourceId;
  });
}

export function isResourceAvailable(resourceId: string): boolean {
  return !!getResource(resourceId);
}
