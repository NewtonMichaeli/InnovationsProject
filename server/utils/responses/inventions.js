// Invention responses:

// : globals
const incompleteFields = (res, data) => res.status(400).json({status: false, msg: 'Some fields are invalid or missing', data}).end()
const inventionNotFound = res => res.status(400).json({status: false, msg: 'Invention not found'}).end()
const contributorNotFound = res => res.status(400).json({status: false, msg: 'Contributor not found'}).end()
const contributorAlreadyExists = res => res.status(400).json({status: false, msg: 'User is already a contributor'}).end()
const randomInventionsFoundSucessfully = (res, data) => res.status(200).json({status: true, msg: 'Random inventions found', data}).end()

// invention : success
const inventionCreatedSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'Invention created successfully', data}).end()
const inventionUpdatedSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'Invention updated successfully', data}).end()
const inventionDeletedSuccessfully = res => res.status(200).json({status: true, msg: 'Invention deleted successfully'}).end()
const inventionSentSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'Invention sent successfully', data}).end()
const inventionContributorsUpdatedSuccessfully = (res, action, data) => 
    res.status(200).json({status: true, msg: `Contributor has been ${action === 'add' ? 'added' : 'removed'} successfully`, data}).end()

// invention : failure
const failedCreatingInvention = (res, data) => res.status(500).json({status: false, msg: 'Failed creating invention', data}).end()
const failedUpdatingInvention = (res, data) => res.status(500).json({status: false, msg: 'Failed updating invention', data}).end()
const failedDeletingInvention = res => res.status(500).json({status: false, msg: 'Failed deleting invention'}).end()
const failedSendingInvention = res => res.status(500).json({status: false, msg: 'Failed sending invention'}).end()
const failedUpdatingInventionContributors = res => res.status(500).json({status: false, msg: 'Failed updating Contributors list'}).end()


module.exports = {inventionCreatedSuccessfully, failedCreatingInvention, incompleteFields, inventionDeletedSuccessfully, failedDeletingInvention, inventionUpdatedSuccessfully, failedUpdatingInvention, inventionNotFound, inventionSentSuccessfully, failedSendingInvention, inventionContributorsUpdatedSuccessfully, failedUpdatingInventionContributors, contributorNotFound, contributorAlreadyExists, randomInventionsFoundSucessfully}