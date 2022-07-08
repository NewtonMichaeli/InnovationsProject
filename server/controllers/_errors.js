// Errors controller
const responseHandler = require('../utils/responses')


// Sign up controller
const fileUploadError = async (error, req, res, next) => {
    // return 500 to cliennt
    console.log('error: ', error)
    return responseHandler.failedUploadingFile(res)
}


module.exports = {fileUploadError}