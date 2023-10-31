import AppServer from './lib/server/core'

import MainRoute from './routes/index.route'

import FireBaseApp from './lib/firebase/firebase'

import { APP_ENV }from './app.environment'

require('dotenv').config()

// import * as functions from 'firebase-functions'

console.log('Environment', process?.env?.NODE_ENV)

const config = {
    db_connection_uri: process?.env?.DEV_DB_CONNECTION,
    // db_connection_uri: "mongodb+srv://filessend109:mongodb@cluster0.bf4zl3m.mongodb.net/expo",
    environment: process?.env?.NODE_ENV
} as Record<string, unknown>

const APPLICATION: AppServer = new AppServer(config)

APPLICATION.activateMiddlewares()

// DB connection
APPLICATION.DBConnection()

MainRoute(APPLICATION.getRouteInstance())

// Global error middlewares
APPLICATION.globalErrorHandler()


// export const app = functions.https.onRequest(APPLICATION)

// Firebase storage service
export const firebaseAppService = new FireBaseApp(APP_ENV?.FIREBASE_CONFIG)
// export const fbStorageService = fbApp.getStorageInstance()


let PORT: number | any = process?.env?.PORT || 5151

APPLICATION.listen(PORT)

export default APPLICATION


