import AppServer from './lib/core'

import MainRoute from './routes/index'

require('dotenv').config()

console.log('Environment', process.env.NODE_ENV)

const APPLICATION = new AppServer()

APPLICATION.activateMiddlewares()

// DB connection

MainRoute(APPLICATION.getRouteInstance())

let PORT: number | any = process.env.PORT || 5151

APPLICATION.listen(PORT)

export default APPLICATION