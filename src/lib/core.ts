import express from 'express'
import cors from 'cors'


export default class AppServer {
    APP
    constructor(){
        this.APP = express()
    }

    async activateMiddlewares(){

        this.APP.use(cors())
        this.APP.use(express.json())
        this.APP.use(express.urlencoded({ extended: true}))
        this.APP.use(express.static('public'))
    }

    async loggerInitiate() {
        // 
    }

    async initiateDBConnection(){
        // 
        return 
    }

    getRouteInstance(){
        return this.APP
    }

    async listen(port: number){
        this.APP.listen(port, () => {
            console.log(`APP listening on http://localhost:${port}`)
        })
    }
}

