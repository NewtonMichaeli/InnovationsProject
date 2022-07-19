import { FC } from "react"


const Loading: FC<{
    width?: string
}> = ({width = '3rem'}) => {

    return (
        <img style={{width}} src="/loading.gif" alt="Loading.." />
    )
}

export default Loading