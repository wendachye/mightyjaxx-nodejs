import { FastifyInstance } from 'fastify';
import {
  ProductCreate,
  ProductDelete,
  ProductDetails,
  ProductList,
  ProductUpdate,
  ProductUploadImage,
} from 'src/controllers/ProductController';
import { upload } from 'src/plugins/common';

import {
  ProductCreateSchema,
  ProductDeleteSchema,
  ProductDetailsSchema,
  ProductListSchema,
  ProductUpdateSchema,
  ProductUploadImageSchema,
} from './schema';

const ProductRoutes = async (fastify: FastifyInstance) => {
  fastify.get<Product.ProductListRequest>(
    '/',
    {
      onRequest: fastify.auth([fastify.basicAuth]),
      schema: ProductListSchema,
    },
    ProductList
  );

  fastify.get<Product.ProductDetailsRequest>(
    '/:sku',
    {
      onRequest: fastify.auth([fastify.basicAuth]),
      schema: ProductDetailsSchema,
    },
    ProductDetails
  );

  fastify.post<Product.ProductCreateRequest>(
    '/',
    {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: ProductCreateSchema,
    },
    ProductCreate
  );

  fastify.patch<Product.ProductUpdateRequest>(
    '/:sku',
    {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: ProductUpdateSchema,
    },
    ProductUpdate
  );

  fastify.post<Product.ProductUploadImageRequest>(
    '/:sku/image',
    {
      onRequest: fastify.auth([fastify.verifyJWT]),
      preHandler: upload.single('image'),
      schema: ProductUploadImageSchema,
    },
    ProductUploadImage
  );

  fastify.delete<Product.ProductDeleteRequest>(
    '/:sku',
    {
      onRequest: fastify.auth([fastify.verifyJWT]),
      schema: ProductDeleteSchema,
    },
    ProductDelete
  );
};

export default ProductRoutes;
