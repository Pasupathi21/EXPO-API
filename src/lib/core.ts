import express from 'express'
import cors from 'cors'


export default class AppServer {
    APP
    constructor(){
        this.APP = express()
    }

    activateMiddlewares(){

        this.APP.use(cors())
        this.APP.use(express.json())
        this.APP.use(express.urlencoded({ extended: true}))
    }

    initiateDBConnection(){
        // 
    }

    listen(port: number){
        this.APP.listen(port, () => {
            console.log(`APP listening on http://localhost:${port}`)
        })
    }
}

