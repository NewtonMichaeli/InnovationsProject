const router = require('express').Router()
const inventionController = require('../controllers/invention')
// middlewares:
const { authUser } = require('../middlewares/authUser')
const { authInventionPrivacy } = require('../middlewares/authInventionPrivacy')


// Routes:  /api/inventions/

// @route   GET /api/inventions/:limit?
// @desc    Endpoint for sending back random inventions within the request's region
router.get('/:limit?', inventionController.getInventionsByRegion)

// @route   POST /api/inventions/
// @desc    Endpoint for creating inventions for a specified user
router.post('/', authUser, inventionController.createInvention)

// @route   DELETE /api/inventions/:project_id/
// @desc    Endpoint for deleting inventions given it's id
router.delete('/:project_id', authUser, inventionController.deleteInvention)

// @route   GET /api/inventions/assets/:username/:project_id/
// @desc    Endpoint for sending back inventions
router.get('/:username/:project_id', authInventionPrivacy, inventionController.getInventionData)

// @route   PATCH /api/inventions/:username/:project_id/
// @desc    Endpoint for updating (others) invention data externally
router.patch('/:username/:project_id', authInventionPrivacy, inventionController.updateInventionData)

// @route   PATCH /api/inventions/contributors/:project_id/:action/:user_id
// @desc    Endpoing for updating user:contributors list
router.patch('/contributors/:project_id/:action/:user_id', authUser, inventionController.updateContributorsList)


module.exports = router