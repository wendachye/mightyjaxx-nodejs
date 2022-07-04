import { FastifyReply, FastifyRequest } from 'fastify';
import { login, logout, profile, register } from 'src/services/UserService';

export const UserRegister = async (
  request: FastifyRequest<{ Body: User.UserRegisterRequest }>,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body;
    const { error, user } = await register(email, password);

    if (error) {
      reply.badRequest(error);
      return;
    }

    reply.send(user);
  } catch (error) {
    request.server.log.error(error);
    reply.internalServerError();
  }
};

export const UserLogin = async (
  request: FastifyRequest<{ Body: User.UserLoginRequest }>,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body;
    const { error, accessToken } = await login(email, password);

    if (error) {
      reply.badRequest(error);
      return;
    }

    reply.send(accessToken);
  } catch (error) {
    request.server.log.error(error);
    reply.internalServerError();
  }
};

export const UserLogout = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { user, token } = request;
    const error = await logout(user, token);

    if (error) {
      reply.badRequest(error);
      return;
    }

    reply.code(204);
  } catch (error) {
    request.server.log.error(error);
    reply.internalServerError();
  }
};

export const UserProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { user } = request;
    const { error, profile: userProfile } = await profile(user);

    if (error) {
      reply.badRequest(error);
      return;
    }

    reply.send(userProfile);
  } catch (error) {
    request.server.log.error(error);
    reply.internalServerError();
  }
};
