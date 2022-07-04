import FastifyCors from '@fastify/cors';
import FastifySensible from '@fastify/sensible';
import FastifyStatic from '@fastify/static';
import { FastifyInstance, FastifyRequest } from 'fastify';
import Multer, { MulterError } from 'fastify-multer';
import { File, FileFilterCallback } from 'fastify-multer/lib/interfaces';
import fp from 'fastify-plugin';
import fs from 'fs';
import path from 'path';
import { IMAGE_JPEG, IMAGE_JPG, IMAGE_PNG, IMAGE_WEBP, MAX_FILE_SIZE } from 'src/constants/common';
import { v4 as uuidv4 } from 'uuid';

const limits = {
  fieldSize: MAX_FILE_SIZE,
};

const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/products');
    const folderExists = fs.existsSync(uploadPath);

    if (!folderExists) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uuid = uuidv4();
    const fileExtension = path.extname(file.originalname);
    const filename = `${uuid}${fileExtension}`;

    cb(null, filename);
  },
});

const whitelist = [IMAGE_PNG, IMAGE_JPG, IMAGE_JPEG, IMAGE_WEBP];

const fileFilter = (req: FastifyRequest, file: File, cb: FileFilterCallback) => {
  if (!whitelist.includes(file.mimetype)) {
    return cb(new Error('Unsupported Media Type'));
  }
  cb(null, true);
};

export const upload = Multer({ fileFilter, limits, storage });

const plugins = async (fastify: FastifyInstance) => {
  fastify.register(FastifyCors);
  fastify.register(FastifySensible);
  fastify.register(Multer.contentParser);
  fastify.register(FastifyStatic, {
    prefix: '/api/v1',
    root: path.join(__dirname, '../uploads/products'),
  });
  fastify.setErrorHandler((error, request, reply) => {
    if (error instanceof MulterError) {
      reply.badRequest(error.message);
      return;
    }
    if (error.message === 'Unsupported Media Type') {
      reply.unsupportedMediaType('Image file type is not supported');
      return;
    }
    reply.send(error);
  });
};

export default fp(plugins);
