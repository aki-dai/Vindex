import React, { useState, useEffect } from 'react'
import { Watch } from '../Watch/WatchPage';
import { TextField, Button, makeStyles } from '@material-ui/core';

import { useSelector } from "react-redux";
import { tagStateTypes } from '../Reducer/tagReducer'
import { useMovieInfo } from '../components/customHooks';


export const Editor = () => {
    const getMovieInfo = useMovieInfo()

    const tagState: tagStateTypes = useSelector((state :any) => state.tagReducer)
    const userState = useSelector((state :any) => state.userReducer)
    //console.log({tagState}, {userState})

    const title = tagState.editor.title
    const channelName = tagState.editor.channelName
    const [videoId, setVideoId] = useState<string>(tagState.editor.youtubeID)
    const [YouTubeUrl, setYouTubeUrl] = useState<string>(tagState.editor.url)

    useEffect(() => {
        getMovieInfo(videoId, YouTubeUrl)
    }, [videoId, YouTubeUrl, getMovieInfo])


    const changeYouTubeUrl = (e: any) => {
        setYouTubeUrl(e.target.value)
    }

    const loadYouTubeUrl = (e:any) => {
        setVideoId(ExtractVideoId(YouTubeUrl))
    }
    if(userState.authenticated){
        return(
            <>
                <YouTubeUrlInput 
                    changeYouTubeUrl={changeYouTubeUrl}
                    loadYouTubeUrl={loadYouTubeUrl} 
                    YouTubeUrl={YouTubeUrl}
                />
                {(tagState.editor.isRegistered) && (
                    <> 
                        <span style={{color: "#d60"}}>
                            この動画は登録済みです
                        </span>
                    </>
                )}
                
                <Watch youtubeID={videoId} title={title} channelName={channelName} tagType={"editor"}/>
            </>
        )
    } else {
        return(
        <>
            <p>動画の登録には、ログインが必要です。</p>
        </>
        )
    }
}

const ExtractVideoId = (Url:string) => {
    let urlPos:number = Url.indexOf("watch?v=")
    if(urlPos < 0) urlPos = Url.indexOf("outu.be/")
    if(urlPos < 0) return ""
    const videoId = Url.substr(urlPos+8, 11)
    return videoId
}

interface YouTubeUrlInputProps{
    changeYouTubeUrl: (e:any) => void
    loadYouTubeUrl: (e:any) => void
    YouTubeUrl: string
}

const useStyles = makeStyles(theme => ({
    URLInput:{
        marginTop: -12,
    },
}))

const YouTubeUrlInput:React.FC<YouTubeUrlInputProps> = ({changeYouTubeUrl, loadYouTubeUrl, YouTubeUrl}) => {
    const classes = useStyles()
    return(
        <>
            <TextField onChange={(e) => changeYouTubeUrl(e)} value={YouTubeUrl} label="YouTubeのURL" className={classes.URLInput}/>
            <Button onClick={loadYouTubeUrl}>
                動画を読み込む
            </Button>
        </>
    )
}