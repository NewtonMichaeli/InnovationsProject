const router = require('express').Router()
const innovationController = require('../controllers/innovation')
const responseHandler = require('../utils/responses/innovations')
const multer = require('multer')

const upload = multer({dest: 'uploads'})

// routes

// @route   POST /api/innovations/upload-file/:user_id
// @desc    Endpoint for uploading assets associated with an innovation
router.post('/upload-file/:user_id/:project_id', upload.single('file'), innovationController.upload)

// -- handle multer exceptions
router.use((error, req, res, next) => responseHandler.failedUploadingFile(res))

// @route   POST /api/innovations/create/:user_id
// @desc    Endpoint for uploading assets associated with an innovation
router.post('/create/:user_id', innovationController.createInnovation)


module.exports = router