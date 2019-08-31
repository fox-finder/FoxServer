
import * as express from 'express';
import { FoxFileProvider } from '@fox-finder/base';
import { ensureProvider, normalizeResponse } from './file.utils';

export const fileRouter = express.Router();

fileRouter.get('/list', (req, res) => {
  const { headers, query } = req;
  const resourceId = headers['resource-id'] as string;
  normalizeResponse(res)(
    ensureProvider(resourceId).then(
      (provider: FoxFileProvider) => provider.listFile(query.path, query.keyword),
    ),
  );
});

fileRouter.get('/stat', (req, res) => {
  const { headers, query } = req;
  const resourceId = headers['resource-id'] as string;
  normalizeResponse(res)(
    ensureProvider(resourceId).then(
      (provider: FoxFileProvider) => provider.stat(query.path),
    ),
  );
});

fileRouter.get('/second', (req, res) => {
  res.send('second');
});

fileRouter.get('/treen', (req, res) => {
  res.send('treen');
});
