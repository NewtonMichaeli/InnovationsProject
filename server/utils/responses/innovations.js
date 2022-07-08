// Innovation responses:

// : globals
const incompleteFields = (res, data) => res.status(400).json({status: false, msg: 'Some fields are invalid or missing', data}).end()
const innovationNotFound = res => res.status(400).json({status: false, msg: 'Innovation not found'}).end()
const contributorNotFound = res => res.status(400).json({status: false, msg: 'Contributor not found'}).end()
const contributorAlreadyExists = res => res.status(400).json({status: false, msg: 'User is already a contributor'}).end()

// innovation : success
const innovationCreatedSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'Innovation created successfully', data}).end()
const innovationUpdatedSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'Innovation updated successfully', data}).end()
const innovationDeletedSuccessfully = res => res.status(200).json({status: true, msg: 'Innovation deleted successfully'}).end()
const innovationSentSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'Innovation sent successfully', data}).end()
const innovationContributorsUpdatedSuccessfully = (res, action, data) => 
    res.status(200).json({status: true, msg: `Contributor has been ${action === 'add' ? 'added' : 'removed'} successfully`, data}).end()

// innovation : failure
const failedCreatingInnovation = (res, data) => res.status(500).json({status: false, msg: 'Failed creating innovation', data}).end()
const failedUpdatingInnovation = (res, data) => res.status(500).json({status: false, msg: 'Failed updating innovation', data}).end()
const failedDeletingInnovation = res => res.status(500).json({status: false, msg: 'Failed deleting innovation'}).end()
const failedSendingInnovation = res => res.status(500).json({status: false, msg: 'Failed sending innovation'}).end()
const failedUpdatingInnovationContributors = res => res.status(500).json({status: false, msg: 'Failed updating Contributors list'}).end()


module.exports = {innovationCreatedSuccessfully, failedCreatingInnovation, incompleteFields, innovationDeletedSuccessfully, failedDeletingInnovation, innovationUpdatedSuccessfully, failedUpdatingInnovation, innovationNotFound, innovationSentSuccessfully, failedSendingInnovation, innovationContributorsUpdatedSuccessfully, failedUpdatingInnovationContributors, contributorNotFound, contributorAlreadyExists}