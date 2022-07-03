const router = require('express').Router()
const authController = require('../controllers/auth')
// middlewares
const { isAdmin } = require('../middlewares/isAdmin')


// routes
router.post('/signup', isAdmin, authController.signup)

router.post('/signin', authController.signin)


module.exports = router