
import * as express from 'express';
import { FoxFileProvider } from '@fox-finder/base';
import { ensureProvider, normalizeResponse } from './file.utils';

export const fileRouter = express.Router();

fileRouter.get('/list', (req, res) => {
  const { header, query } = req;
  const resourceId = header['resource-id'];
  normalizeResponse(res)(
    ensureProvider(resourceId).then(
      (provider: FoxFileProvider) => provider.listFile(query.path, query.keyword),
    ),
  );
});

fileRouter.get('/one', (req, res) => {
  res.send('one');
});

fileRouter.get('/second', (req, res) => {
  res.send('second');
});

fileRouter.get('/treen', (req, res) => {
  res.send('treen');
});
