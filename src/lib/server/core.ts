import express from 'express'
import cors from 'cors'
import * as  mongoose from 'mongoose'
import helmet from 'helmet'

import fileUpload from 'express-fileupload'

import { GlobalErrorHandler } from '../../middleware/global-error-handler'

type Tconfig = Record<string, ArrayLike<Record<string, any>> | number | string | boolean | Record<string, any> | unknown>

export default class AppServer {
    APP
    DB_URI!: string  
    // MONGOOSE!: mongoose.Mongoose
    constructor(config: Tconfig){
        this.APP = express()
        this.DB_URI = config.db_connection_uri as string
        // this.MONGOOSE = mongoose
    }

    public async activateMiddlewares(){
        let byte = 1024;
        let kb = 1024;
        let mb = 40
        this.APP.use(cors())
        // Protect http header attack
        this.APP.use(helmet())
        this.APP.use(express.json())
        this.APP.use(express.urlencoded({ extended: true}))
        this.APP.use(express.static('public'))
        // For multipart file handling
        this.APP.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/temp/',
            limits: {
                fileSize: mb * kb * byte
            }
        }))
    }

    public async loggerInitiate() {
        // 
    }

    public async DBConnection(){
        try{

           await mongoose.connect(this.DB_URI,{   
            // useNewUrlParser: true,
            // useUnifiedTopology: true
           })
           console.log('DB connected successfully')
          

        }catch(e){

            console.log('DB connection error')
        } 
    }

    // public getMongoose(){
    //     return this.MONGOOSE
    // }

    public getRouteInstance(){
        return this.APP
    }

    /**
     * @Note : use this error middleware to finally in middleware pipeline
     */
    public globalErrorHandler() {
        this.APP.use(GlobalErrorHandler)
    }

    async listen(port: number){
        this.APP.listen(port, () => {
            console.log(`APP listening on port: ${port}`)
        })
    }
}

