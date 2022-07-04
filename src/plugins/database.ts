import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { connect, connection } from 'mongoose';
import Models from 'src/models';

const database = async (fastify: FastifyInstance) => {
  fastify.decorate('models', Models);

  connection.on('connected', () => {
    fastify.log.info('MongoDB connected');
  });
  connection.on('disconnected', () => {
    fastify.log.error('MongoDB disconnected');
  });

  await connect(process.env.MONGO_DB_URI || '');
};

export default fp(database);
