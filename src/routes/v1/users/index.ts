import { FastifyInstance } from 'fastify';
import { UserLogin, UserLogout, UserProfile, UserRegister } from 'src/controllers/UserController';

import { UserLoginSchema, UserRegisterSchema } from './schema';

const UserRoutes = async (fastify: FastifyInstance) => {
  fastify.post<{ Body: User.UserRegisterRequest }>(
    '/register',
    {
      onRequest: fastify.auth([fastify.basicAuth]),
      schema: UserRegisterSchema,
    },
    UserRegister
  );

  fastify.post<{ Body: User.UserLoginRequest }>(
    '/login',
    {
      onRequest: fastify.auth([fastify.basicAuth]),
      schema: UserLoginSchema,
    },
    UserLogin
  );

  fastify.post(
    '/logout',
    {
      onRequest: fastify.auth([fastify.verifyJWT]),
    },
    UserLogout
  );

  fastify.get(
    '/me',
    {
      onRequest: fastify.auth([fastify.verifyJWT]),
    },
    UserProfile
  );
};

export default UserRoutes;
