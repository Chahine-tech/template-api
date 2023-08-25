import app from './app';
import { healthCheck } from './helpers/utils';
import { postRouter, userRouter } from './routes';

const start = async () => {
  app.get('/', async (request, reply) => {
    reply.send({ name: 'My api' });
  });

  app.register(userRouter, { prefix: '/api/user' });
  app.register(postRouter, { prefix: '/api/post' });
  app.get('/health-check', async (request, reply) => {
    try {
      await healthCheck();
      reply.status(200).send();
    } catch (e) {
      reply.status(500).send();
    }
  });
  app.listen({ port: 8080, host: '127.0.0.1' }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address} 🚀`);
  });
};

start();
