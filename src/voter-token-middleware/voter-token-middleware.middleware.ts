/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { generateRandomToken } from 'src/utils/tokens';

@Injectable()
export class VoterTokenMiddlewareMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    let { voter_token } = req.query

    if (!voter_token || voter_token=="null") {
      voter_token= generateRandomToken() + String(Date.now())
    }
    req.voterToken=voter_token
    next();
  }
}
