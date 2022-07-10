const router = require('express').Router()
const innovationController = require('../controllers/innovation')
// middlewares:
const { authUser } = require('../middlewares/authUser')
const { authInnovationPrivacy } = require('../middlewares/authInnovationPrivacy')


// Routes:  /api/innovations/

// @route   GET /api/innovations/:limit?
// @desc    Endpoint for sending back random innovations within the request's region
router.get('/:limit?', innovationController.getInnovationsByRegion)

// @route   POST /api/innovations/
// @desc    Endpoint for creating innovations for a specified user
router.post('/', authUser, innovationController.createInnovation)

// @route   DELETE /api/innovations/:project_id/
// @desc    Endpoint for deleting innovations given it's id
router.delete('/:project_id', authUser, innovationController.deleteInnovation)

// @route   GET /api/innovations/assets/:username/:project_id/
// @desc    Endpoint for sending back innovations
router.get('/:username/:project_id', authInnovationPrivacy, innovationController.getInnovationData)

// @route   PATCH /api/innovations/:username/:project_id/
// @desc    Endpoint for updating (others) innovation data externally
router.patch('/:username/:project_id', authInnovationPrivacy, innovationController.updateInnovationData)

// @route   PATCH /api/innovations/contributors/:project_id/:action/:user_id
// @desc    Endpoing for updating user:contributors list
router.patch('/contributors/:project_id/:action/:user_id', authUser, innovationController.updateContributorsList)


module.exports = router