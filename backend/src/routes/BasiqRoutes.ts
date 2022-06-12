import { Router, Request, Response } from 'express';
import { Basiq, BasiqScope } from '../services/BasiqService/BasiqService';

export const BasiqRoutes = Router();

const basiq = new Basiq();

BasiqRoutes.post('/token', async (req: Request, res: Response) => {
  const tokenType = req.body.token;
  if (!(tokenType && (tokenType === 'server' || tokenType === 'client')))
    res.status(500).json({ error: 'Invalid token request.' });

  let scope: BasiqScope | undefined = undefined;
  if (tokenType === 'server') {
    scope = BasiqScope.SERVER_ACCESS;
  } else if (tokenType === 'client') {
    scope = BasiqScope.CLIENT_SCOPE;
    if (!req.body.id) {
      res.status(500).json({ error: 'Invalid client token request.' });
    }
  }
  const data = await basiq.generateToken(scope!, req.body.id);
  res.status(200).json({ data });
});

BasiqRoutes.post('/consent', async (req: Request, res: Response) => {
  const consent = await basiq.getConsentUrl(req.body.userId);
  res.status(200).json({ url: consent });
});

BasiqRoutes.get('/job/:jobId', async (req: Request, res: Response) => {
  const jobInfo = await basiq.getJob(req.params.jobId);
  res.status(200).json({ data: jobInfo });
});

BasiqRoutes.get('/user/:userId', async (req: Request, res: Response) => {
  const user = await basiq.getUser(req.params.userId);
  res.status(200).json({ data: user });
});

BasiqRoutes.post('/user', async (req: Request, res: Response) => {
  //TODO: sanitize
  const data = await basiq.createUser(req.body);
  res.status(201).json(data);
});
BasiqRoutes.get('/user/:userId/jobs/', async (req: Request, res: Response) => {
  const jobInfo = await basiq.getJobs(req.params.userId);
  res.status(200).json({ data: jobInfo });
});

BasiqRoutes.get(
  '/transactions/:userId',
  async (req: Request, res: Response) => {
    const transactions = await basiq.getTransactions(
      req.params.userId,
      req.params.accountId,
    );
    res.status(200).json(transactions);
  },
);
