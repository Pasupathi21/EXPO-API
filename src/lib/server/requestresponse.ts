import { Request, Response} from 'express'
import { MESSAGES } from '../../data/statuscode'

type TSuccessData = Record<string, unknown | any> | Record<string, any>[]
type TFailedData = Record<string, unknown | any> | Record<string, any>[]

export default class RequestResponseModule{
    request!: Request;
    response!: Response;
    constructor({ request, response}: Record<string, any>){
        this.request = request;
        this.response = response;
    }

    success(data: TSuccessData, message: string, code?: number){
        this.response.statusCode = code || 200
        this.response.status(code || 200).send({
            status: true,
            statusMessage: MESSAGES?.SUCCESS,
            response: data,
            statusCode: code,
            message
        })
    }

    failed(data: TFailedData, message: string, code?:number){
        this.response.statusCode = code || 500
        this.response.status(code || 500).send({
            status: false,
            statusMessage: MESSAGES?.FAILED,
            statusCode: code,
            response: data,
            message
        })
    }
}


