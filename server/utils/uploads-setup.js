// File sets up the <upload> directory and returns an upload method (module) 

const multer = require('multer')
const {ASSETS_FOLDER_NAME, FILE_SIZE_LIMIT} = require('../configs/_server')


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
    limits: {fileSize: FILE_SIZE_LIMIT}
}).single('file')


module.exports = upload