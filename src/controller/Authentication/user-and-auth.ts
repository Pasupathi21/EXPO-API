import { Request, Response} from 'express'
import RequestResponseModule from '../../lib/server/requestresponse'

class UserAndAuth {
    async createUser(request: Request, response: Response) {
        const res = new  RequestResponseModule({ request, response })
        try{

        }catch(e){

        }
    }
}

export default new UserAndAuth()