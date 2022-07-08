// Assets responses:

// asset : success
const fileUploadedSuccessfully = res => res.status(200).json({status: true, msg: 'File uploaded successfully'}).end()
const fileDeletedSuccessfully = res => res.status(200).json({status: true, msg: 'File deleted successfully'}).end()
const fileFoundAndTransfered = (res, path) => res.status(200).sendFile(path)

// asset : failure
const failedUploadingFile = res => res.status(500).json({status: false, msg: 'File uploading failed'}).end()
const fileNotfound = res => res.status(404).json({status: false, msg: 'File not found'}).end()


module.exports = {fileUploadedSuccessfully, fileDeletedSuccessfully, fileFoundAndTransfered, failedUploadingFile, fileNotfound}