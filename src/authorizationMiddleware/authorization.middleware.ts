/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
const jwt = require("jsonwebtoken");
import {objectOfApiKey} from'src/utils/objectApiKey';
@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const apiKey = req.query.access_token

    const obj = objectOfApiKey.find((obj)=>
      obj===apiKey
    )

    if(!obj){
        res.send({error:"error"})
        return
    }

    const infoInToken = jwt.verify(apiKey, "secret");
    req.infoInToken = infoInToken;
    req.userEmail =infoInToken.email
    next();
  }
}
