// types
import { FC } from "react"
import { MinifiedUserType } from "../../redux/features/user/user.types"


const UserResult: FC<{
    data: MinifiedUserType
}> = ({data}) => {

    return (
        <div className={"Result"}>
            {data.Fname} {data.Sname}
        </div>
    )
}

export default UserResult