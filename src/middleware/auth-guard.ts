import { Request, Response, NextFunction } from 'express'
import RequestResponseModule from '../lib/server/requestresponse'
import { APP_NAME } from '../data/constant'
import * as jwt from 'jsonwebtoken'

export default function AuthGuard(request: Request, response: Response, next: NextFunction){
    const res = new RequestResponseModule({request, response})
    try{
        const token = request.headers['access-token'] as string

        if(!token){
            return res.failed({}, 'Un-Authorized', 401)
        }
        let [appName, originalToken] = token?.split('-')
        if(!(appName === APP_NAME.toLowerCase())){
            return res.failed({}, 'Invalid token', 401)
        }
        if(jwt.verify(originalToken, '1 to 10')){
            next()
        }
        return res.failed({}, 'Un-Authorized', 401)
    }catch(error){
        next(error)
    }
}