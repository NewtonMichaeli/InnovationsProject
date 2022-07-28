// file renderer util

import { FC, useState } from "react";
// types
import { SERVER_URI__GET_ASSET } from "../../configs/_server";
import { AssetType } from "../../types/data/invention.types"
// icons
import { TbFileText } from 'react-icons/tb'
// styles
import styles from '../../styles/components/shared/file-renderer.module.css'


// allowed html file extensions
const allowedFileExtensions = {
    _image: ['png', 'jfif', 'jpeg', 'jpg', 'svg', 'ico', 'webp'],
    _video: ['mp4', 'webm', 'ogg']
}


// Input: filename (string)
// Output: associated media tag for file rendering (or none)
const RenderFile: FC<{
    file: AssetType,
    project_id: string
}> = ({project_id, file}) => {

    // states
    const {path: filename, originalName} = file
    const file_ext = filename.split('.').slice(-1)[0]
    const [hasError, setHasError] = useState(file_ext === filename)
    // methods
    const onError = () => setHasError(true)
    // components
    const NormalFileRender: FC = () => (
        <div className={styles['file-asset']}>
            <div className={styles['file-header']}>
                <TbFileText size={34} />
                {file_ext ? <code>.{file_ext}</code> : ''}
            </div>
        </div>
    )

    // -- an error has occured while rendering media
    if (hasError) return <NormalFileRender />

    // -- check image render capability
    else if (allowedFileExtensions._image.includes(file_ext)) 
        return <img 
            className={styles['image-asset']} 
            src={SERVER_URI__GET_ASSET(project_id, filename)} 
            alt={filename} onError={onError} />

    // -- check video render capability
    else if (allowedFileExtensions._video.includes(file_ext)) 
        return <video 
            className={styles['video-asset']} 
            src={SERVER_URI__GET_ASSET(project_id, filename)} 
            onError={onError} />

    // -- non of the above formats are supported for rendering html media
    else return <NormalFileRender />
}

export default RenderFile