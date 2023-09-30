import express from 'express'
import cors from 'cors'
import * as  mongoose from 'mongoose'

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

        this.APP.use(cors())
        this.APP.use(express.json())
        this.APP.use(express.urlencoded({ extended: true}))
        this.APP.use(express.static('public'))
    }

    public async loggerInitiate() {
        // 
    }

    public async DBConnection(){
        try{

           await mongoose.connect(this.DB_URI)
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

    async listen(port: number){
        this.APP.listen(port, () => {
            console.log(`APP listening on http://localhost:${port}`)
        })
    }
}

