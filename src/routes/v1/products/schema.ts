import { FastifySchema } from 'fastify';

export const ProductListSchema: FastifySchema = {
  querystring: {
    properties: {
      limit: { type: 'number' },
      order: { type: 'string' },
      page: { type: 'number' },
      query: { type: 'string' },
      sort: { type: 'string' },
    },
    required: [],
    type: 'object',
  },
};

export const ProductDetailsSchema: FastifySchema = {
  params: {
    properties: {
      sku: { type: 'string' },
    },
    required: ['sku'],
    type: 'object',
  },
};

export const ProductCreateSchema: FastifySchema = {
  body: {
    properties: {
      sku: { type: 'string' },
      title: { type: 'string' },
    },
    required: ['sku', 'title'],
    type: 'object',
  },
};

export const ProductUpdateSchema: FastifySchema = {
  body: {
    properties: {
      sku: { type: 'string' },
      title: { type: 'string' },
    },
    required: [],
    type: 'object',
  },
  params: {
    properties: {
      sku: { type: 'string' },
    },
    required: ['sku'],
    type: 'object',
  },
};

export const ProductUploadImageSchema: FastifySchema = {
  params: {
    properties: {
      sku: { type: 'string' },
    },
    required: ['sku'],
    type: 'object',
  },
};

export const ProductDeleteSchema: FastifySchema = {
  params: {
    properties: {
      sku: { type: 'string' },
    },
    required: ['sku'],
    type: 'object',
  },
};
