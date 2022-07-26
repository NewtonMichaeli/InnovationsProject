import Link from 'next/link'
// types
import { FC } from 'react'
import { CLIENT_URIS, INVENTION_SECTIONS, INVENTION_USER_ROLES } from '../../configs/_client'
// icons
import { FiEdit3 } from 'react-icons/fi'
import { useAppSelector } from '../../hooks/redux'
import { inventionSelector } from '../../redux/features/invention'
import { useRouter } from 'next/router'


/**
 * @param section (typeof INVENTION_SECTIONS)
 * @param includeRole (typeof INVENTION_USER_ROLES | undefined)
 * @param excludeRole (typeof INVENTION_USER_ROLES | undefined)
 * @param className (typeof string | undefined)
 * @returns JSX component for edit-icon-button for editing invention sections
 */
const EditSectionBtn: FC<{
    section: INVENTION_SECTIONS,
    className?: string,
    includeRole?: INVENTION_USER_ROLES,
    excludeRole?: INVENTION_USER_ROLES
}> = ({section, className, excludeRole, includeRole}) => {
    // states
    const { project_id } = useRouter().query
    const { InventionUserRole } = useAppSelector(inventionSelector)

    // allow editing to the given invention-user-roles
    if ((includeRole && InventionUserRole === includeRole) || (excludeRole && InventionUserRole !== excludeRole)) 
        return (
            <Link href={CLIENT_URIS._INVENTION_EDIT_TAB(project_id as string, section)} shallow>
                <FiEdit3 className={className} size={20} />
            </Link>
        )
    else return <></>
}

export default EditSectionBtn