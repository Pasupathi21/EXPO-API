import express, { Request,Response } from 'express'
import DB from '../../model/index.model'

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
}

export default new Test()