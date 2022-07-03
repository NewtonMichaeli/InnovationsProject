// Auth responses:

const incorrectCredentials = res => res.status(403).json({status: false, msg: 'Your email or password is incorrect'}).end()

const loggedInSuccessfully = (res, token) => res.status(200).json({status: true, msg: 'Successfully logged in', data: token}).end()

const userCreatedSuccessfully = (res, token) => res.status(200).json({status: true, msg: 'User created successfully', data: token}).end()

const userDeletedSuccessfully = res => res.status(200).json({status: true, msg: 'User deleted successfully'}).end()

const userUpdatedSuccessfully = res => res.status(200).json({status: true, msg: 'User updated successfully'}).end()

const userSentSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'User updated successfully', data}).end()

const incompleteFields = res => res.status(400).json({status: false, msg: 'Some fields are invalid or missing'}).end()

const failedCreatingUser = (res, data) => res.status(500).json({status: false, msg: 'Couldn\'t create user', data}).end()

module.exports = {incorrectCredentials, loggedInSuccessfully, userCreatedSuccessfully, userDeletedSuccessfully, userUpdatedSuccessfully, userSentSuccessfully, incompleteFields, failedCreatingUser}