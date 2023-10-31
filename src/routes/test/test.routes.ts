import APPLICATION from '../../app'
import {  Express } from 'express'

// Controller import
import Test from '../../controller/test/test.contoller'


export default function TestRoute(route: Express | unknown | any){
    route.get('/test', Test.test)

    route.post('/api/test-upload', Test.testFileUpload)
}

