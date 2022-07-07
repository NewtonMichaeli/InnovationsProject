const router = require('express').Router()
const innovationController = require('../controllers/innovation')
const errorController = require('../controllers/_errors')
const { PRIVILEGES } = require('../configs/_server')
// middlewares:
const { authInnovationPrivacy, allowPrivileges } = require('../middlewares/authInnovationPrivacy')
// multer setup:
const upload = require('../utils/uploads-setup')


// Routes:  /api/innovations/assets/

// @route   GET /api/innovations/assets/:username/:project_id/:filename/
// @desc    Endpoint for sending back assets
router.get(
    '/:username/:project_id/:filename', 
    authInnovationPrivacy, 
    innovationController.sendAsset
)

// @route   POST /api/innovations/assets/:username/:project_id/
// @desc    Endpoint for uploading assets associated with an innovation
router.post(
    '/:username/:project_id',
    authInnovationPrivacy,
    allowPrivileges(PRIVILEGES.CREATOR, PRIVILEGES.CONTRIBUTOR),
    upload,
    innovationController.uploadAsset,
    errorController.fileUploadError
)

// @route   DELETE /api/innovations/assets/:username/:project_id/:asset_id/
// @desc    Endpoint for deleting assets associated with an innovation
router.delete(
    '/:username/:project_id/:asset_id', 
    authInnovationPrivacy, 
    allowPrivileges(PRIVILEGES.CREATOR, PRIVILEGES.CONTRIBUTOR),
    innovationController.deleteAsset
)


module.exports = router