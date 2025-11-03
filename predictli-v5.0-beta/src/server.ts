import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { api } from './api/index.js';

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(rateLimit({ windowMs: 60000, max: 120 }));
app.use(api);
app.get('/', (_req, res) => res.send(`Predictli ${env.FACTORY_MODULE_ID} v5.0-beta`));

const HOST = 'localhost';
app.listen(env.PORT, HOST, () => console.log(`🚀 Predictli v5.0-beta listening on ${HOST}:${env.PORT}`));
