import express, { Express, Router} from 'express'

import TestRoute from './test/test.routes'
import Test2Route from './test/test-2.route'
import AuthenticationRoutes from './authentication/authentication.route'

export default function ManinRoute(AppRoute: Express | unknown ){
    // ************************** | Test |****************************
    TestRoute(AppRoute)
    Test2Route(AppRoute)

    // **************** Authentication *****************************
    AuthenticationRoutes(AppRoute)
}