// Auth responses:

// : global
const incompleteFields = res => res.status(400).json({status: false, msg: 'Some fields are invalid or missing'}).end()
const incorrectCredentials = res => res.status(403).json({status: false, msg: 'Your email or password is incorrect'}).end()
const accessDenied = res => res.status(403).json({status: false, msg: 'Access denied'}).end()
const userNotFound = res => res.status(400).json({status: false, msg: 'User not found'}).end()

// user : success
const loggedInSuccessfully = (res, token) => res.status(200).json({status: true, msg: 'Successfully logged in', data: token}).end()
const userCreatedSuccessfully = (res, token) => res.status(200).json({status: true, msg: 'User created successfully', data: token}).end()
const userUpdatedSuccessfully = (res, new_data, new_token) => 
    res.status(200).json({status: true, msg: 'User updated successfully', data: {new_data, new_token}}).end()
const userDeletedSuccessfully = res => res.status(200).json({status: true, msg: 'User deleted successfully'}).end()
const userSentSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'User sent successfully', data}).end()

// user : failure
const failedCreatingUser = (res, data) => res.status(500).json({status: false, msg: 'Couldn\'t create user', data}).end()
const failedUpdatingUser = (res, data) => res.status(500).json({status: false, msg: 'Couldn\'t update user', data}).end()
const failedDeletingUser = (res, data) => res.status(500).json({status: false, msg: 'Couldn\'t delete user', data}).end()


module.exports = {incorrectCredentials, loggedInSuccessfully, userCreatedSuccessfully, userDeletedSuccessfully, userUpdatedSuccessfully, userSentSuccessfully, incompleteFields, failedCreatingUser, accessDenied, failedUpdatingUser, userNotFound, failedDeletingUser}