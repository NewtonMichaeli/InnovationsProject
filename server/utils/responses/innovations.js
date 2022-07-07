// Innovation responses:

// : globals
const incompleteFields = (res, data) => res.status(400).json({status: false, msg: 'Some fields are invalid or missing', data}).end()
const innovationNotFound = res => res.status(400).json({status: false, msg: 'Innovation not found'}).end()

// innovation : success
const innovationCreatedSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'Innovation created successfully', data}).end()
const innovationUpdatedSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'Innovation updated successfully', data}).end()
const innovationDeletedSuccessfully = res => res.status(200).json({status: true, msg: 'Innovation deleted successfully'}).end()
const innovationSentSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'Innovation sent successfully', data}).end()

// innovation : failure
const failedCreatingInnovation = (res, data) => res.status(500).json({status: false, msg: 'Failed creating innovation', data}).end()
const failedUpdatingInnovation = (res, data) => res.status(500).json({status: false, msg: 'Failed updating innovation', data}).end()
const failedDeletingInnovation = res => res.status(500).json({status: false, msg: 'Failed deleting innovation'}).end()
const failedSendingInnovation = res => res.status(500).json({status: false, msg: 'Failed sending innovation'}).end()

// asset : success
const fileUploadedSuccessfully = res => res.status(200).json({status: true, msg: 'File uploaded successfully'}).end()
const fileDeletedSuccessfully = res => res.status(200).json({status: true, msg: 'File deleted successfully'}).end()
const fileFoundAndTransfered = (res, path) => res.status(200).sendFile(path)

// asset : failure
const failedUploadingFile = res => res.status(500).json({status: false, msg: 'File uploading failed'}).end()
const fileNotfound = res => res.status(404).json({status: false, msg: 'File not found'}).end()


module.exports = {innovationCreatedSuccessfully, fileUploadedSuccessfully, failedUploadingFile, failedCreatingInnovation, incompleteFields, innovationDeletedSuccessfully, failedDeletingInnovation, fileNotfound, fileFoundAndTransfered, innovationUpdatedSuccessfully, failedUpdatingInnovation, fileDeletedSuccessfully, innovationNotFound, innovationSentSuccessfully, failedSendingInnovation}