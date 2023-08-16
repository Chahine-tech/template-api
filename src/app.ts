import autoLoad from '@fastify/autoload';
import path from 'path';
import fastify from 'fastify';
import cors from '@fastify/cors';

const app = fastify();

app.register(cors);

app.register(autoLoad, {
  dir: path.join(__dirname, 'routes'),
});

export default app;
