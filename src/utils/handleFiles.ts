import * as util from 'util'
import * as fs from 'fs'


import { TNormal, TNestedObj, TObj } from '../types/global.types'
import { Request } from 'express'




export const promisify = util.promisify

export const extractFormDataFromRequest = (requestPayload: Request, type?: TNormal): TNestedObj | TNestedObj[] | unknown | any => {
    return requestPayload?.files || []
}

export const readFileAsStream = (obj: Record<any, any>) => {

    return fs.createReadStream(obj?.path)
}

export const unLinkFile =  promisify(fs.unlink)

export const readFileAsBuffer = promisify(fs.readFile)

export const mkDir = promisify(fs.mkdir)


export async function createDirectory(path: string){
    return mkDir(path)
}

