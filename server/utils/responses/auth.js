// Auth responses:

// : global
const incompleteFields = res => res.status(400).json({status: false, msg: 'Some fields are invalid or missing'}).end()
const incorrectCredentials = res => res.status(403).json({status: false, msg: 'Your email or password is incorrect'}).end()
const accessDenied = res => res.status(403).json({status: false, msg: 'Access denied'}).end()

// user : success
const loggedInSuccessfully = (res, token) => res.status(200).json({status: true, msg: 'Successfully logged in', data: token}).end()
const userCreatedSuccessfully = (res, token) => res.status(200).json({status: true, msg: 'User created successfully', data: token}).end()
const userUpdatedSuccessfully = res => res.status(200).json({status: true, msg: 'User updated successfully'}).end()
const userDeletedSuccessfully = res => res.status(200).json({status: true, msg: 'User deleted successfully'}).end()
const userSentSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'User sent successfully', data}).end()

// user : failure
const failedCreatingUser = (res, data) => res.status(500).json({status: false, msg: 'Couldn\'t create user', data}).end()


module.exports = {incorrectCredentials, loggedInSuccessfully, userCreatedSuccessfully, userDeletedSuccessfully, userUpdatedSuccessfully, userSentSuccessfully, incompleteFields, failedCreatingUser, accessDenied}