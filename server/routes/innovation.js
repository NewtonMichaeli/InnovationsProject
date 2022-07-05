const multer = require('multer')
const router = require('express').Router()
const innovationController = require('../controllers/innovation')
const responseHandler = require('../utils/responses/innovations')
const {ASSETS_FOLDER_NAME} = require('../configs/_server')
// middlewares
const { authUser } = require('../middlewares/authUser')
const { userAndInnovationExists } = require('../middlewares/userAndInnovationExists')
const { authInnovationPrivacy } = require('../middlewares/authInnovationPrivacy')

const upload = multer({
    dest: ASSETS_FOLDER_NAME, 
    limits: {fileSize: 1024 * 1024 * 16}
})

// Routes:


// @route   POST /api/innovations/
// @desc    Endpoint for creating innovations for a specified user
router.post('/', authUser, innovationController.createInnovation)

// @route   DELETE /api/innovations/:project_id
// @desc    Endpoint for deleting innovations given it's id
router.delete('/:project_id', authUser, innovationController.deleteInnovation)

// @route   DELETE /api/innovations/:project_id
// @desc    Endpoint for updating a specified innovation's data
// router.patch('/:project_id', authUser, innovationController.updateInnovationData)

// @route   POST /api/innovations/assets/:username/:project_id
// @desc    Endpoint for uploading assets associated with an innovation
router.post(
    '/assets/:username/:project_id',
    userAndInnovationExists,                                                // -- validate user and innovation
    upload.single('file'),                                                  // -- multer middleware
    innovationController.uploadAsset,                                       // -- controller
    (error, req, res, next) => responseHandler.failedUploadingFile(res)     // -- handle multer error
)

// @route   GET /api/innovations/assets/:username/:project_id/:filename
// @desc    Endpoint for sending assets
router.get('/assets/:username/:project_id/:filename', authInnovationPrivacy, innovationController.sendAsset)


module.exports = router