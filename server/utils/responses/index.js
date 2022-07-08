// Response-handler global module

const assetsResponseHandler = require('./assets')
const innovationResponseHandler = require('./innovations')
const authResponseHandler = require('./auth')

module.exports = {...assetsResponseHandler, ...innovationResponseHandler, ...authResponseHandler}