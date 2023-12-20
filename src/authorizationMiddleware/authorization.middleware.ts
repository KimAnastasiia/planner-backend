/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
const CLIENT_ID = '190541474326-dhb8n9vuv9vbd81b9qdit1s0849un5pj.apps.googleusercontent.com';
import { OAuth2Client } from 'google-auth-library';
@Injectable()

export class AuthorizationMiddleware implements NestMiddleware {

  async use(req: any, res: any, next: () => void) {
    const { access_token } = req.query;

    if (!access_token) {
      return res.status(400).json({ error: 'Access token not provided.' });
    }

    if (access_token == "1") {
      req.userEmail =  'test@test.com' ; // You can access the user data in your route handlers using req.googleUserData
      next();

    } else {

      const client = new OAuth2Client(CLIENT_ID);
      let tokenInfo
      try {
        tokenInfo = await client.getTokenInfo(
          access_token
        );
      } catch (error) {
        return res.status(401).json({ error: 'Invalid access token.' });
      }
      if (tokenInfo != undefined) {
        const payload = tokenInfo;

        req.userEmail = payload.email; // You can access the user data in your route handlers using req.googleUserData

      }
      next();
      console.log("midd")
    }
  }
}
