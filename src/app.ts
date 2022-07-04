import autoload from '@fastify/autoload';
import fastify from 'fastify';
import path from 'path';

import { createTestAccount } from './scripts/boot';

const PORT = Number(process.env.PORT) || 3001;
const app = fastify({ logger: true });

require('dotenv').config();

const start = async () => {
  try {
    app.register(autoload, {
      dir: path.join(__dirname, 'plugins'),
    });

    app.register(autoload, {
      dir: path.join(__dirname, 'routes/v1'),
      ignorePattern: /.*(schema).ts/,
      options: Object.assign({ prefix: '/api/v1' }),
    });

    await app.listen({ port: PORT });
    await app.ready();

    global.fastify = app;

    createTestAccount();
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
