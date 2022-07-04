import { FastifyInstance } from 'fastify';
import { ProductImage } from 'src/controllers/ImageController';

const ImageRoutes = async (fastify: FastifyInstance) => {
  fastify.get<Image.ProductImageRequest>('/products/:filename', {}, ProductImage);
};

export default ImageRoutes;
