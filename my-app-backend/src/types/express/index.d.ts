/* eslint-disable @typescript-eslint/no-explicit-any */
// import type { JwtPayload } from 'jsonwebtoken';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Request } from 'express';
// import type { JwtPayload } from 'jsonwebtoken';
declare module 'express-serve-static-core' {
  interface Request {
    // user?: string | JwtPayload;
    current_user: any,
    cookies: {
      authToken: string | undefined
    } | undefined; 
  }
}