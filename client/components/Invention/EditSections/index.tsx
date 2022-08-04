import { useRouter } from 'next/router'
import { FC } from 'react'
// types
import { INVENTION_SECTIONS, INVENTION_USER_ROLES } from '../../../configs/_client'
// redux
import { useAppSelector } from '../../../hooks/redux'
import { inventionSelector } from '../../../redux/features/invention'
// components
import Assets_EditSection from './Assets.editor'
import Information_EditSection from './Information.editor'
import Members_EditSection from './Members.editor'
import AboutYou_EditSection from './AboutYou.editor'
import Loading from '../../global/loading'


/**
 * @returns JSX-component for a section editor (according to current url & invention-user-role)
 */
const EditorSection: FC = () => {
    // states
    const { query, push } = useRouter()
    const edit = query['edit'] as INVENTION_SECTIONS
    const { InventionUserRole } = useAppSelector(inventionSelector)

    // -- determine & return section editor
    if (!edit) return <></>
    else if (!InventionUserRole) return <Loading />
    else if (edit === 'information' && InventionUserRole !== INVENTION_USER_ROLES.OBSERVER) return <Information_EditSection />
    else if (edit === 'assets' && InventionUserRole !== INVENTION_USER_ROLES.OBSERVER) return <Assets_EditSection />
    else if (edit === 'members' && InventionUserRole === INVENTION_USER_ROLES.CREATOR) return <Members_EditSection />
    else if (edit === 'aboutyou' && InventionUserRole === INVENTION_USER_ROLES.CREATOR) return <AboutYou_EditSection />
    else return <></>
}

export default EditorSection