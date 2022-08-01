// Assets responses:

// asset : success
const fileUploadedSuccessfully = (res, data) => 
    res.status(200).json({status: true, msg: 'File uploaded successfully', data}).end()
const fileDeletedSuccessfully = res => res.status(200).json({status: true, msg: 'File deleted successfully'}).end()
const fileFoundAndTransfered = (res, path) => res.status(200).sendFile(path)
const fileFoundAndDownloaded = (res, path) => res.status(200).download(path)

// asset : failure
const failedUploadingFile = (res, data) => res.status(500).json({status: false, msg: 'File uploading failed', data}).end()
const fileNotfound = res => res.status(404).json({status: false, msg: 'File not found'}).end()


module.exports = {fileUploadedSuccessfully, fileDeletedSuccessfully, fileFoundAndTransfered, failedUploadingFile, fileNotfound, fileFoundAndDownloaded}