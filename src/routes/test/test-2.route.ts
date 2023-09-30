import APPLICATION from '../../app'
import {  Express } from 'express'

// Controller import
import Test from '../../controller/test/test.contoller'


export default function Test2Route(route: Express | unknown | any){
    route.get('/test-2', Test.testTwo)
}

