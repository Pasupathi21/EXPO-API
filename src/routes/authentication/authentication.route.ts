import { Express} from 'express'

import UserAndAuth from '../../controller/Authentication/user-and-auth.controller'

export default function AuthenticationRoutes(route: Express | unknown | any){
    route.post('/user/create', UserAndAuth.createUser)
}