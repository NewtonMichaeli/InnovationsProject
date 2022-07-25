const router = require('express').Router()
const inventionController = require('../controllers/invention')
// middlewares:
const { authUser } = require('../middlewares/authUser')
const { authInventionPrivacy } = require('../middlewares/authInventionPrivacy')
const { checkValidObjectIdParams } = require('../middlewares/globals')


// Routes:  /api/inventions/

// @route   GET /api/inventions/search/:limit?
// @desc    Endpoint for sending back random inventions within the request's region
router.get('/search/:limit?', inventionController.getInventionsByRegion)

// @route   POST /api/inventions/
// @desc    Endpoint for creating inventions for a specified user
router.post('/', authUser, inventionController.createInvention)

// @route   DELETE /api/inventions/:project_id/
// @desc    Endpoint for deleting inventions given it's id
router.delete('/:project_id', checkValidObjectIdParams, authUser, inventionController.deleteInvention)

// @route   GET /api/inventions/:project_id/
// @desc    Endpoint for sending back inventions
router.get('/:project_id', checkValidObjectIdParams, authInventionPrivacy, inventionController.getInventionData)

// @route   PATCH /api/inventions/:project_id/
// @desc    Endpoint for updating (others) invention data externally
router.patch(
    '/:project_id',
    checkValidObjectIdParams,
    authInventionPrivacy,
    inventionController.updateInventionData
)

// @route   PATCH /api/inventions/contributors/:project_id/:action/:user_id
// @desc    Endpoing for updating user:contributors list
router.patch(
    '/contributors/:project_id/:action/:user_id', 
    checkValidObjectIdParams, 
    authUser, 
    inventionController.updateContributorsList
)


module.exports = router