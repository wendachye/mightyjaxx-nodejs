import { FastifyReply, FastifyRequest } from 'fastify';

export const ProductImage = async (
  request: FastifyRequest<Image.ProductImageRequest>,
  reply: FastifyReply
) => {
  try {
    const { filename } = request.params;
    return reply.sendFile(filename);
  } catch (error) {
    request.server.log.error(error);
    reply.internalServerError();
  }
};
