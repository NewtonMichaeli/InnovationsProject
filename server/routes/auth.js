const router = require('express').Router()
const authController = require('../controllers/auth')
// middlewares:
const { isAdmin } = require('../middlewares/isAdmin')
const { authUser } = require('../middlewares/authUser')


// Routes:  /api/auth/

// @route   GET /api/auth/:username/
// @desc    Endpoint for sending back user data (no validation)
router.get('/:username', authController.getProtectedUserData)

// @route   GET /api/auth/
// @desc    Endpoint for sending back user data
router.get('/', authUser, authController.getUserData)

// @route   PATCH /api/auth/
// @desc    Endpoing for updating user data
router.patch('/', authUser, authController.updateUserData)

// @route   DELETE /api/auth/
// @desc    Endpoing for deleting user
router.delete('/', authUser, authController.deleteUser)

// @route   POST /api/auth/signin/
// @desc    Endpoint for signing in
router.post('/signin', authController.signin)

// @route   POST /api/auth/signup/
// @desc    Endpoint for creating a user (admins can create admin-users)
router.post('/signup', isAdmin, authController.signup)

// @route   PATCH /api/auth/followings/:action/:user_id
// @desc    Endpoing for updating user:following list
router.patch('/followings/:action/:user_id', authUser, authController.updateFollowingList)


module.exports = router