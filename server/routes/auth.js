const router = require('express').Router()
const authController = require('../controllers/auth')
// middlewares
const { isAdmin } = require('../middlewares/isAdmin')
const { authUser } = require('../middlewares/authUser')

// Routes:

// @route   POST /api/auth/
// @desc    Endpoint for sending back user data
router.get('/', authUser, authController.getUserData)

// @route   PATCH /api/auth/
// @desc    Endpoing for updating user data
router.patch('/', authUser, authController.)

// @route   POST /api/auth/signin/
// @desc    Endpoint for signing in
router.post('/signin', authController.signin)

// @route   POST /api/auth/signup/
// @desc    Endpoint for creating a user (admins can create admin-users)
router.post('/signup', isAdmin, authController.signup)


module.exports = router