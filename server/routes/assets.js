const router = require('express').Router()
const assetsController = require('../controllers/assets')
const errorController = require('../controllers/_errors')
const { PRIVILEGES } = require('../configs/_server')
// middlewares:
const { authInventionPrivacy, allowPrivileges } = require('../middlewares/authInventionPrivacy')
const { checkValidObjectIdParams } = require('../middlewares/globals')
// multer setup:
const upload = require('../utils/uploads-setup')
const { checkUserData } = require('../middlewares/checkUserData')


// Routes:  /api/inventions/assets/

// @route   GET /api/inventions/assets/:username/:project_id/:filename/
// @desc    Endpoint for sending back assets
router.get(
    '/:project_id/:filename/:download?',
    checkValidObjectIdParams,
    authInventionPrivacy, 
    assetsController.sendAsset
)

// @route   POST /api/inventions/assets/:username/:project_id/
// @desc    Endpoint for uploading assets associated with an invention
router.post(
    '/:project_id',
    checkValidObjectIdParams,
    authInventionPrivacy,
    checkUserData,
    allowPrivileges(PRIVILEGES.CREATOR, PRIVILEGES.CONTRIBUTOR),
    upload,
    assetsController.uploadAsset,
    errorController.fileUploadError
)

// @route   DELETE /api/inventions/assets/:username/:project_id/:asset_id/
// @desc    Endpoint for deleting assets associated with an invention
router.delete(
    '/:project_id/:asset_id',
    checkValidObjectIdParams,
    authInventionPrivacy,
    allowPrivileges(PRIVILEGES.CREATOR, PRIVILEGES.CONTRIBUTOR),
    assetsController.deleteAsset
)


module.exports = router