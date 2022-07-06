const multer = require('multer')
const router = require('express').Router()
const innovationController = require('../controllers/innovation')
const responseHandler = require('../utils/responses/innovations')
const errorController = require('../controllers/_errors')
const {ASSETS_FOLDER_NAME, FILE_SIZE_LIMIT} = require('../configs/_server')
// middlewares
const { authUser } = require('../middlewares/authUser')
const { authInnovationPrivacy } = require('../middlewares/authInnovationPrivacy')

// -- multer setup
const storage = multer.diskStorage({
    destination: ASSETS_FOLDER_NAME,
    filename: (req, {originalname}, set) => {
        const extn = originalname.split('.').slice(-1)[0]
        set(null, `${new Date().getTime()}.${extn.length !== 1 ? extn : ''}`)
    }
})
const upload = multer({storage, limits: {fileSize: FILE_SIZE_LIMIT}}).single('file')

// Routes:

// @route   POST /api/innovations/
// @desc    Endpoint for creating innovations for a specified user
router.post('/', authUser, innovationController.createInnovation)

// @route   DELETE /api/innovations/:project_id/
// @desc    Endpoint for updating a specified innovation's data
router.patch('/:project_id', authUser, innovationController.updateInnovationData)

// @route   DELETE /api/innovations/:project_id/
// @desc    Endpoint for deleting innovations given it's id
router.delete('/:project_id', authUser, innovationController.deleteInnovation)

// @route   GET /api/innovations/assets/:username/:project_id/:filename/
// @desc    Endpoint for sending assets
router.get('/assets/:username/:project_id/:filename', authInnovationPrivacy, innovationController.sendAsset)

// @route   POST /api/innovations/assets/:project_id/
// @desc    Endpoint for uploading assets associated with an innovation
router.post(
    '/assets/:project_id',
    authUser,
    upload,
    innovationController.uploadAsset,
    errorController.fileUploadError
)

// @route   DELETE /api/innovations/assets/:project_id/
// @desc    Endpoint for deleting assets associated with an innovation
router.delete('/assets/:project_id/:asset_id', authUser, innovationController.deleteAsset)


module.exports = router