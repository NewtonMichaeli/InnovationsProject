import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
// redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { userSelector, userActions } from '../../redux/features/user'

const ProjectViewer: FC = () => {

    const dispatch = useAppDispatch()
    const { project_id } = useRouter().query
    const { User } = useAppSelector(userSelector)
    const innovation = User?.Inventions.find(inv => inv._id === project_id)

    return (
        <main>
            {innovation?.Name}
        </main>
    )
}

export default ProjectViewer