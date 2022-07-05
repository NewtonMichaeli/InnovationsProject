const router = require('express').Router()
const innovationController = require('../controllers/innovation')
const responseHandler = require('../utils/responses/innovations')
// middlewares
const { userAndInnovationExists } = require('../middlewares/userAndInnovationExists')
const multer = require('multer')

const upload = multer({dest: 'uploads'})

// Routes:

// @route   POST /api/innovations/upload-file/:username/:project_id
// @desc    Endpoint for uploading assets associated with an innovation
router.post('/upload-file/:username/:project_id', userAndInnovationExists, upload.single('file'), innovationController.upload)

// @route   POST /api/innovations/create/:username
// @desc    Endpoint for creating innovations for a specified user
router.post('/create/:username', innovationController.createInnovation)


// -- handle multer exceptions
router.use((error, req, res, next) => responseHandler.failedUploadingFile(res))


module.exports = router