// Innovation responses:

const innovationCreatedSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'Innovation created successfully', data}).end()

const innovationDeletedSuccessfully = res => res.status(200).json({status: true, msg: 'Innovation deleted successfully'}).end()

const innovationUpdatedSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'Innovation updated successfully', data}).end()

const failedCreatingInnovation = (res, data) => res.status(500).json({status: false, msg: 'Failed creating innovation', data}).end()

const failedUpdatingInnovation = res => res.status(500).json({status: false, msg: 'Failed updating innovation'}).end()

const failedDeletingInnovation = res => res.status(500).json({status: false, msg: 'Failed deleting innovation'}).end()

const fileUploadedSuccessfully = res => res.status(200).json({status: true, msg: 'File uploaded successfully'}).end()

const failedUploadingFile = res => res.status(500).json({status: false, msg: 'File uploading failed'}).end()

const incompleteFields = res => res.status(400).json({status: false, msg: 'Some fields are invalid or missing'}).end()

const fileNotfound = res => res.status(404).json({status: false, msg: 'File not found'}).end()

const fileFoundAndTransfered = (res, path) => res.status(200).sendFile(path)

module.exports = {innovationCreatedSuccessfully, fileUploadedSuccessfully, failedUploadingFile, failedCreatingInnovation, incompleteFields, innovationDeletedSuccessfully, failedDeletingInnovation, fileNotfound, fileFoundAndTransfered, innovationUpdatedSuccessfully, failedUpdatingInnovation}