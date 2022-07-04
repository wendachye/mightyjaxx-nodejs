import { FastifyReply, FastifyRequest } from 'fastify';
import {
  createProduct,
  deleteProduct,
  productDetails,
  productList,
  updateProduct,
  uploadProductImage,
} from 'src/services/ProductService';

export const ProductList = async (
  request: FastifyRequest<Product.ProductListRequest>,
  reply: FastifyReply
) => {
  try {
    const { page = 1, limit = 10, sort = 'createdAt', order = 'desc', query = '' } = request.query;
    const products = await productList(page, limit, sort, order, query);
    reply.send(products);
  } catch (error) {
    request.server.log.error(error);
    reply.internalServerError();
  }
};

export const ProductDetails = async (
  request: FastifyRequest<Product.ProductDetailsRequest>,
  reply: FastifyReply
) => {
  try {
    const { sku } = request.params;
    const { error, product } = await productDetails(sku);

    if (error) {
      reply.badRequest(error);
      return;
    }

    reply.send(product);
  } catch (error) {
    request.server.log.error(error);
    reply.internalServerError();
  }
};

export const ProductCreate = async (
  request: FastifyRequest<Product.ProductCreateRequest>,
  reply: FastifyReply
) => {
  try {
    const { user } = request;
    const newProduct = request.body;
    const { error, product } = await createProduct(user, newProduct);

    if (error) {
      reply.badRequest(error);
      return;
    }

    reply.send(product);
  } catch (error) {
    request.server.log.error(error);
    reply.internalServerError();
  }
};

export const ProductUpdate = async (
  request: FastifyRequest<Product.ProductUpdateRequest>,
  reply: FastifyReply
) => {
  try {
    const product = request.body;
    const { sku } = request.params;
    const { product: updatedProduct, error } = await updateProduct(sku, product);

    if (error) {
      reply.badRequest(error);
      return;
    }

    reply.send(updatedProduct);
  } catch (error) {
    request.server.log.error(error);
    reply.internalServerError();
  }
};

export const ProductUploadImage = async (
  request: FastifyRequest<Product.ProductUploadImageRequest>,
  reply: FastifyReply
) => {
  try {
    if (!request?.file) {
      reply.badRequest('Image file is required');
    }

    const { sku } = request.params;
    const filename = request.file?.filename || '';
    const { error, product } = await uploadProductImage(sku, filename);

    if (error) {
      reply.badRequest(error);
      return;
    }

    reply.send(product);
  } catch (error) {
    request.server.log.error(error);
    reply.internalServerError();
  }
};

export const ProductDelete = async (
  request: FastifyRequest<Product.ProductDeleteRequest>,
  reply: FastifyReply
) => {
  try {
    const { sku } = request.params;
    const { error } = await deleteProduct(sku);

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
