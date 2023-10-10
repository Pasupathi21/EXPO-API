import { Request, Response, NextFunction } from 'express'

import RequestResponseModule from '../lib/server/requestresponse'

export const GlobalErrorHandler = (error: Error, request: Request, response: Response, next:NextFunction) => {
  const res =  new RequestResponseModule({ request, response })
  try{
    let message = error?.message;
    return res.failed({}, message)
  }catch(e: any){
    return res.failed({}, e.message)
  }
} 