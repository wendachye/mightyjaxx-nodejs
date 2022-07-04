import fastifyAuth from '@fastify/auth';
import fastifyBasicAuth from '@fastify/basic-auth';
import fastifyJWT from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import Users from 'src/models/Users';

const USERNAME = process.env.BASIC_AUTH_USERNAME || '';
const PASSWORD = process.env.BASIC_AUTH_PASSWORD || '';
const JWT_SECRET = process.env.JWT_SECRET || '';

const validate = async (username: string, password: string) => {
  if (username !== USERNAME || password !== PASSWORD) {
    return new Error('Basic Authentication failed');
  }
};

const verifyJWT = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();

    const token = request.headers.authorization?.replace('Bearer ', '') || '';
    const user = await Users.findOne({ 'accessTokens.id': token }).lean();

    if (!user) {
      reply.unauthorized();
      return;
    }

    request.user = user._id.toString();
    request.token = token;
  } catch (error) {
    request.server.log.error(error);
    reply.send(error);
  }
};

const auth = async (fastify: FastifyInstance) => {
  fastify.register(fastifyAuth);

  fastify.register(fastifyBasicAuth, { authenticate: true, validate });

  fastify.register(fastifyJWT, { secret: JWT_SECRET });

  fastify.decorate('authenticate', verifyJWT);

  fastify.decorate('verifyJWT', verifyJWT);
};

export default fp(auth);
