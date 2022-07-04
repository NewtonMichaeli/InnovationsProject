const router = require('express').Router()
const authController = require('../controllers/auth')
// middlewares
const { isAdmin } = require('../middlewares/isAdmin')
const { authUser } = require('../middlewares/authUser')


// routes
router.post('/signup', isAdmin, authController.signup)

router.post('/signin', authController.signin)

router.get('/', authUser, authController.getUserData)

module.exports = router