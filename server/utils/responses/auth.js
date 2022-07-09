// Auth responses:

// : global
const incompleteFields = (res, data) => res.status(400).json({status: false, msg: 'Some fields are invalid or missing', data}).end()
const incorrectCredentials = res => res.status(403).json({status: false, msg: 'Your email or password is incorrect'}).end()
const accessDenied = res => res.status(403).json({status: false, msg: 'Access denied'}).end()
const userNotFound = res => res.status(400).json({status: false, msg: 'User not found'}).end()
const alreadyFollowingUser = res => res.status(400).json({status: false, msg: 'Already following user'}).end()
const notFollowingUser = res => res.status(400).json({status: false, msg: 'Cannot remove a non-following user'}).end()
const failedSearchingWithQuery = (res, msg) => res.status(400).json({status: false, msg}).end()
const successfullSearchWithQuery = (res, data) => res.status(200).json({status: false, data}).end()

// user : success
const loggedInSuccessfully = (res, token) => res.status(200).json({status: true, msg: 'Successfully logged in', data: token}).end()
const userCreatedSuccessfully = (res, token) => res.status(200).json({status: true, msg: 'User created successfully', data: token}).end()
const userUpdatedSuccessfully = (res, new_data, new_token) => 
res.status(200).json({status: true, msg: 'User updated successfully', data: {new_data, new_token}}).end()
const userDeletedSuccessfully = res => res.status(200).json({status: true, msg: 'User deleted successfully'}).end()
const userSentSuccessfully = (res, data) => res.status(200).json({status: true, msg: 'User sent successfully', data}).end()
const followingUserSuccessfully = (res, method) => 
    res.status(200).json({status: true, msg: `User has been ${method === 'remove' ? 'removed from' : 'added to'} followings`}).end()

// user : failure
const failedCreatingUser = (res, data) => res.status(500).json({status: false, msg: 'Couldn\'t create user', data}).end()
const failedUpdatingUser = (res, data) => res.status(500).json({status: false, msg: 'Couldn\'t update user', data}).end()
const failedDeletingUser = (res) => res.status(500).json({status: false, msg: 'Couldn\'t delete user'}).end()
const failedFollowingUser = res => res.status(500).json({status: true, msg: 'Failed followings user'}).end()


module.exports = {incorrectCredentials, loggedInSuccessfully, userCreatedSuccessfully, userDeletedSuccessfully, userUpdatedSuccessfully, userSentSuccessfully, incompleteFields, failedCreatingUser, accessDenied, failedUpdatingUser, userNotFound, failedDeletingUser, followingUserSuccessfully, failedFollowingUser, alreadyFollowingUser, notFollowingUser, failedSearchingWithQuery, successfullSearchWithQuery}