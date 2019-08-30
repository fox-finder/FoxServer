
import { Response } from 'express';
import { FoxFileProvider } from '@fox-finder/base';
import { getProviderByResourceId } from './file.provider';
import { getSuccessResponse, getFailedResponse } from '../http';
import { isResourceAvailable } from '../resource';

export function ensureProvider(resourceId: string): Promise<FoxFileProvider> {
  // validate resource
  return new Promise((resolve, reject) => {
    isResourceAvailable(resourceId)
      ? resolve(resourceId)
      : reject('Resource unavailable!');
  })
  // validate provider
  .then((_resourceId: string) => getProviderByResourceId(_resourceId))
  .then((provider: FoxFileProvider) => provider.ensureAvailability());
}

export function normalizeResponse(res: Response) {
  return promise => promise
    .then(data => res.send(getSuccessResponse(data)))
    .catch(error => res.status(400).send(getFailedResponse(String(error))));
}