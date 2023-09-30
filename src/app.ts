import AppServer from './lib/core'

import MainRoute from './routes/index.route'

require('dotenv').config()

console.log('Environment', process.env.NODE_ENV)

const config = {
    db_connection_uri: process.env.DEV_DB_CONNECTION,
    environment: process.env.NODE_ENV
} as Record<string, unknown>

const APPLICATION = new AppServer(config)

APPLICATION.activateMiddlewares()

// DB connection
APPLICATION.DBConnection()

MainRoute(APPLICATION.getRouteInstance())

let PORT: number | any = process.env.PORT || 5151

APPLICATION.listen(PORT)

export default APPLICATION