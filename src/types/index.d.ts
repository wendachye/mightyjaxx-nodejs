import 'fastify';

import { File } from 'fastify-multer/lib/interfaces';

declare module 'fastify' {
  export interface FastifyInstance {
    verifyJWT: () => void;
  }

  export interface FastifyRequest {
    file?: File;
    token: string;
    user: string;
  }
}
