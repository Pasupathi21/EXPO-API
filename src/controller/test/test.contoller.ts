import express, { Request,Response } from 'express'

class Test {
    test(req: Request, res: Response){
        res.json({
            message: 'working'
        })
    }

    testTwo(req: Request, res: Response){
        res.json({
            message: 'Test tow working fine 👍👍👍'
        })
    }
}

export default new Test()