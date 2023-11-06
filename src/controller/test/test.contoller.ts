import express, { Request,Response } from 'express'
import DB from '../../model/index.model'

import { firebaseAppService } from '../../app'

import { extractFormDataFromRequest } from '../../utils/handleFiles'

import { readFileAsStream, readFileAsBuffer, unLinkFile } from '../../utils/handleFiles'

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


    async testFileUpload (request: Request | any, response:Response){
        try{
            let { fileType } = request.query
            console.log('Request', request.files);
            const fileObj = extractFormDataFromRequest(request)
            console.log('fiileObj', fileObj)
            // const data = readFileAsStream(request.files[0])
            // const data = await readFileAsBuffer(fiileObj[0]?.path)
            // let { data }: any = request?.files['file(s)'];
            // request.files
            // console.log('extractFormDataFromRequest(request)', extractFormDataFromRequest(request))
            const uploadedRes = await firebaseAppService.uploadFile(extractFormDataFromRequest(request) , fileType)
            // console.log('data >', data)
            // await unLinkFile(fiileObj[0]?.path)
            response.send({
                message: 'File upload success',
                // uploadedRes: extractFormDataFromRequest(request),
                uploadedRes
            })
        }catch(e){
            console.log('error', e)
            response.send(e)
        }
    }
}

export default new Test()