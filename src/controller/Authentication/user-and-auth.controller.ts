import { NextFunction, Request, Response} from 'express'
import RequestResponseModule from '../../lib/server/requestresponse'
import DB from '../../model/index.model'
import  { Jsonparse } from '../../utils/json'
import { MESSAGES, STATUS_CODE } from '../../data/statuscode'
import * as bcrypt from 'bcrypt'
import { APP_NAME } from '../../data/constant'
import * as jwt from 'jsonwebtoken'
require('dotenv').config('../../..')

class UserAndAuth {
    async createUser(request: Request, response: Response, next: NextFunction) {
        const res = new  RequestResponseModule({ request, response })
        try{
            let payload = request.body
            payload = Jsonparse(payload)
            console.log('payload >>', payload)

            // Encrypt password
            let saltValue = await bcrypt.genSalt(7)
            payload.password = await bcrypt.hash(payload.password, saltValue)

           const createdUser = await DB.User.create(payload)
           res.success(createdUser, `User ${MESSAGES?.CREATE}`)
        }catch(error){
            console.log('ERROR', error)
            next(error)
        }
    }
    async signUp(request: Request, response: Response, next: NextFunction){
        const res = new RequestResponseModule({request, response})
        try{
            let { email, password, username } = request.body
            if(!(email || username) || !password){
                return res.failed({}, 'Login failed', 200)
            }
            let userNameOrEmail = username ? await DB.User.findOne({ username }) : await DB.User.findOne({ email });
            if(!userNameOrEmail){
                return res.failed({}, `No ${username ? 'username' : 'email'} found `, STATUS_CODE[3])
            }
            let isTrue = await bcrypt.compare(password, userNameOrEmail?.password)
            if(!isTrue) return res.failed({}, 'Password wrong', 500)

            // Return jsonwebtoken
            let token = jwt.sign({
                username: userNameOrEmail?.username,
                email: userNameOrEmail?.email
            }, '1 to 10')

            token = `${APP_NAME?.toLowerCase()}-${token}`
            res.success({
                token,
                username: userNameOrEmail?.username,
                email: userNameOrEmail?.email
            }, `login ${MESSAGES.SUCCESS}`)
        }catch(error){
            console.log('Error', error)
            next(error)
        }
    }
}

export default new UserAndAuth()    