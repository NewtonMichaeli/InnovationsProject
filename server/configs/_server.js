// Configs for server
const path = require('path')
const AUTH_TOKEN = 'auth-token'
const ASSETS_FOLDER_NAME = 'uploads'
const ASSETS_FOLDER_PATH = path.resolve(__dirname, '..', ASSETS_FOLDER_NAME)    // relative to this file
const FILE_SIZE_LIMIT = 1024 * 1024 * 16    // -- 16MB
const PRIVILEGES = {
    OBSERVER: 'OBSERVER',
    CONTRIBUTOR: 'CONTRIBUTOR',
    CREATOR: 'CREATOR'
}

module.exports = {AUTH_TOKEN, ASSETS_FOLDER_PATH, ASSETS_FOLDER_NAME, FILE_SIZE_LIMIT, PRIVILEGES}