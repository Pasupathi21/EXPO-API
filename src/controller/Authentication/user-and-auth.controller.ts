import { NextFunction, Request, Response} from 'express'
import RequestResponseModule from '../../lib/server/requestresponse'
import DB from '../../model/index.model'
import  { Jsonparse } from '../../util/json'
import { MESSAGES } from '../../data/statuscode'

class UserAndAuth {
    async createUser(request: Request, response: Response, next: NextFunction) {
        const res = new  RequestResponseModule({ request, response })
        try{
            let payload = request.body
            payload = Jsonparse(payload)
            console.log('payload >>', payload)
           const createdUser = await DB.User.create(payload)
           res.success(createdUser, `User ${MESSAGES?.CREATE}`)
        }catch(error){
            console.log('ERROR', error)
            next(error)
        }
    }
}

export default new UserAndAuth()