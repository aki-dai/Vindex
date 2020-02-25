import React from 'react'
import { Typography } from '@material-ui/core'

interface notificationProps{
    post: string
}

export const Notification:React.FC<notificationProps> = ({post}) => {
    const switchNotification = () => {
        switch(post){
            case "MovieResister":
                return(
                    <MovieResisterNotification />
                )
            case "TagUpdate":
                return(
                    <TagUpdateNotification />
                )

            default:
        }
    }
 
    return(
        <>
            {switchNotification()}
        </>
    )
}

const MovieResisterNotification = () => {
    return(
        <>
            <Typography variant={"h5"}>
                動画登録しました
            </Typography>
        </>
    )
}

const TagUpdateNotification = () => {
    return(
        <>
            <Typography variant={"h5"}>
                タグを更新しました
            </Typography>
        </>
    )
}