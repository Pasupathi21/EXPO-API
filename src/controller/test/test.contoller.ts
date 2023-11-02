import express, { Request,Response } from 'express'
import DB from '../../model/index.model'

import { firebaseAppService } from '../../app'

class Test {
    test(req: Request, res: Response){
        res.json({
            message: 'working'
        })
    }

    async testTwo(req: Request, res: Response){
        let createData = await DB.TestCollection.create({
            name: 'hello',
            number: 2134567
        })
        res.json({
            message: 'Test tow working fine 👍👍👍',
            data: createData
        })
    }


    async testFileUpload (request: Request, response:Response){
        try{
            console.log('Request', request.files)
            request.files
            const uploadRes = await firebaseAppService.uploadFile(request?.files?.files as any, 'VIDEO')
            response.send({
                message: 'File upload success',
                uploadRes
            })
        }catch(e){
            response.send(e)
        }
    }
}

export default new Test()