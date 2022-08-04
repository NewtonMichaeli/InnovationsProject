import { FC, MouseEvent, useEffect, useState } from "react"
// types
import { UploadAssetType } from "../../../../types/data/invention.types"
// redux
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux"
import { inventionActions, inventionSelector } from "../../../../redux/features/invention"
import { pushFeedback } from "../../../../redux/features/ui/ui.actions"
// icons
import { AiOutlineCloudUpload } from "react-icons/ai"
import { BsArrowRight } from "react-icons/bs"
import { IoIosCheckmark, IoMdArrowBack } from "react-icons/io"
import { MdOutlineDescription } from "react-icons/md"
// styles
import styles from '../../../../styles/components/Invention/EditSections/assets.module.css'
import { getModuleStylesMethod } from '../../../../utils/styles.utils'

// multiple styles getter util
const getStyles = getModuleStylesMethod(styles)


/**
 * @returns a component that renders a responsive asset-upload-form
 */
 const ResponsiveForm: FC = () => {
    // states
    const dispatch = useAppDispatch()
    const { Invention } = useAppSelector(inventionSelector)
    // data
    const [currentUploadStep, setCurrentUploadStep] = useState(1)
    const [data, setData] = useState<UploadAssetType>({
        file: null,
        description: ''
    })
    // handlers
    const submitHandler = async (e?: MouseEvent<HTMLInputElement>) => {
        e?.preventDefault()
        try {
            await dispatch(inventionActions.uploadAsset({data, project_id: Invention.Project._id}))
            setData({description: '', file: null})    // -- reset data
        }
        catch (err) {
            dispatch(pushFeedback({status: false, msg: err.message ?? "An error has occured"}))
        }
    }
    const responsiveInputHandlers = {
        // -- input methods - relevant on responsive viewport
        back: () => setCurrentUploadStep(s => s > 1 ? s - 1 : s),
        file: () => setCurrentUploadStep(1),
        description: () => setCurrentUploadStep(s => data.file ? 2 : s),
        submit: () => {
            if (data.description && data.file) {
                setCurrentUploadStep(1)
                submitHandler()
            }
        }
    }

    // when <data> changes, change step-indicator accordingly
    useEffect(() => {
        if (!data.file) setCurrentUploadStep(1)
    }, [data])

    return (
        <form className={getStyles(`upload-asset-form ${'step-'+currentUploadStep}`)}>
            {/* BEGIN responsive elements */}
            <div className={styles["resp-steps-progress"]}>
                {/* go-back a step */}
                <IoMdArrowBack 
                    className={styles["back"]} 
                    size={20} 
                    title="Back a step" 
                    onClick={responsiveInputHandlers.back} />
                {/* step:file */}
                <span className={getStyles(`
                    ${currentUploadStep === 1 ? 'current-step' : ''} 
                    ${data.file ? 'valid' : ''}`
                )} onClick={responsiveInputHandlers.file} title="File">
                    <AiOutlineCloudUpload size={20} />
                </span>
                {/* step:description */}
                <span className={getStyles(`
                    ${currentUploadStep === 2 ? 'current-step' : ''} 
                    ${data.file ? 'move-next' : ''} 
                    ${data.description ? 'valid' : ''}`
                )} onClick={responsiveInputHandlers.description} title="Description">
                    <MdOutlineDescription size={20} />
                </span>
                {/* step:submit-file */}
                <span className={getStyles(`
                    ${currentUploadStep === 3 ? 'current-step' : ''} 
                    ${data.file && data.description ? 'move-next' : ''}`
                )} onClick={responsiveInputHandlers.submit} title="Upload">
                    <IoIosCheckmark size={20} />
                </span>
            </div>
            {/* END responsive elements */}
            <div className={styles["inputs-container"]}>
                {/* file input */}
                <div className={getStyles(`input-file ${data.file ? 'valid' : ''}`)}>
                    <AiOutlineCloudUpload className={styles["icon"]} size={40} />
                    <p>Drag & Drop your Asset here</p>
                    <input type="file" name="file" id="File" onChange={e => setData({...data, file: e.target.files?.[0]})} />
                </div>
                {/* description input */}
                <div className={getStyles(`input-description ${data.description.length > 2 ? 'valid' : ''} ${data.file ? '' : 'hidden-step'}`)}>
                    <BsArrowRight className={styles["arrow-step-indicator"]} size={40} />
                    <textarea name="description" id="Description" value={data.description} placeholder='Enter some description'
                        onChange={e => setData({...data, description: e.target.value})} />
                </div>
                {/* submit */}
                <div className={getStyles(`input-submit ${data.description.length > 2 ? '' : 'hidden-step'}`)}>
                    <BsArrowRight className={styles["arrow-step-indicator"]} size={40} />
                    <input type="submit" value="Upload" onClick={submitHandler} />
                </div>
            </div>
        </form>
    )
}

export default ResponsiveForm