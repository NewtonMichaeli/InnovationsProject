// File sets up the <upload> directory and returns an upload method (module) 

const multer = require('multer')
const {ASSETS_FOLDER_NAME, FILE_SIZE_LIMIT} = require('../configs/_server')
const { Joi_AssetSchema_Form } = require('../validations/AssetSchema')


// -- filename constructor
// -- filename: <new Date().getTime()> + <file_extension_type>
const setFilename = (req, {originalname}, set) => {
    const extn = '.' + originalname.split('.').slice(-1)[0]
    set(null, `${new Date().getTime()}${extn.length !== 1 ? extn : ''}`)
}

// -- multer setup
const upload = multer({
    storage: multer.diskStorage({
        destination: ASSETS_FOLDER_NAME,
        filename: setFilename
    }),
    fileFilter: (req, file, cb) => {
        // -- validate description in req.body
        if (Joi_AssetSchema_Form.validate(req.body).error) 
            cb(new Error("Description is required"))
        else cb(null, true)
    },
    limits: {fileSize: FILE_SIZE_LIMIT}
}).single('file')


module.exports = upload