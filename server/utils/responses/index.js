// Response-handler global module

const assetsResponseHandler = require('./assets')
const inventionResponseHandler = require('./inventions')
const authResponseHandler = require('./auth')

module.exports = {...assetsResponseHandler, ...inventionResponseHandler, ...authResponseHandler}