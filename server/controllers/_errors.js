// Errors controller
const responseHandler = require('../utils/responses')


// Sign up controller
const fileUploadError = async (error, req, res, next) => {
    // return 500 to cliennt
    console.log('error: ', error.message)
    return responseHandler.failedUploadingFile(res, error.message ?? "An error has occured")
}


module.exports = {fileUploadError}