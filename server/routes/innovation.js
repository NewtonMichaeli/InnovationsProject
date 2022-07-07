const router = require('express').Router()
const innovationController = require('../controllers/innovation')
// middlewares:
const { authUser } = require('../middlewares/authUser')
const { authInnovationPrivacy } = require('../middlewares/authInnovationPrivacy')


// Routes:  /api/innovations/

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


module.exports = router