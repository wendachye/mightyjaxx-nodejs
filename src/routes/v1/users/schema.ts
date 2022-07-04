import { FastifySchema } from 'fastify';

export const UserRegisterSchema: FastifySchema = {
  body: {
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['email', 'password'],
    type: 'object',
  },
};

export const UserLoginSchema: FastifySchema = {
  body: {
    properties: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['email', 'password'],
    type: 'object',
  },
};
