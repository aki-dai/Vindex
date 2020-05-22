import React, { useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import ReactPlayer from 'react-player'
import { useParams } from 'react-router';
import { TagForm } from './WatchComponents/TagForm';
import {RouteComponentProps} from 'react-router-dom'
import { tagTypes, Tag } from '../Action/actionTypes'
import Axios from 'axios';
import {rootUrl} from '../serverUrl'
import { useSelector, useDispatch } from 'react-redux';
import { loadTag } from '../Action/tagAction';

type WatchPageProps = {
    youtubeID?      : string
    title?          : string
    channelName?    : string
    tagType         : tagTypes
};

interface RouteParams{ 
    id: string  
}

export const Watch:React.FC<WatchPageProps> = ({youtubeID, title, channelName, tagType}) => {
    let urlParams= useParams<RouteParams>()
    let vid: string
    let tags: Tag[]
    const tagState = useSelector((state:any) => state.tagReducer)
    const dispatch = useDispatch()
    if(urlParams.id) vid = urlParams.id
    else if(youtubeID) vid = youtubeID
    else vid = ""
    let width = window.innerWidth
    let movieTitle = (tagType === "movie") ? tagState.movie.title : tagState.editor.title 
    let channelTitle = (tagType === "movie") ? tagState.movie.channelName : tagState.editor.channelName
    
    console.log({tagState})
    useEffect(() => {
        if(tagType === "movie" && tagState.movie.youtubeID !== vid){
            Axios.get( 
                    rootUrl + "/movies/" + vid
                ).then((res) => {
                    const status = res.data.status
                    if(status === "success"){
                        tags = res.data.payload.tag
                        console.log({res, tags, tagType})
                        dispatch(loadTag(vid, tags, tagType))
                    }else if(res.data.error_code === "010"){
                        tags = []
                        dispatch(loadTag(vid, tags, tagType))    
                    }
                }).catch((error) => {
                    console.log({error})
                })
            }
            if(tagType === "editor" && tagState.editor.youtubeID !== vid){
                 Axios.get( 
                         rootUrl + "/movies/" + vid
                     ).then((res) => {
                         const status = res.data.status
                         if(status === "success"){
                             tags = res.data.payload.tag
                             console.log({res, tags, tagType})
                             dispatch(loadTag(vid, tags, tagType))
                         }else if(res.data.error_code === "010"){
                             tags = []
                             dispatch(loadTag(vid, tags, tagType))    
                         }
                     }).catch((error) => {
                         console.log({error})
                     })
             }
        },[vid])
    let url:string = "https://www.youtube.com/watch?v=" + vid

    const config={
        youtube:{
            playerVars:{
                autoplay: 1,
                controls: 1
            }
        }
    }
    
    console.log({movieTitle, channelTitle})

    return(
        <>
            <Grid container direction="row" >
                <Grid item xs={12} md={9}>
                    <Grid container direction="column">
                        <Grid item>
                            <ReactPlayer 
                                url={url}
                                config={config}
                                width={Math.min(width*0.8, 640)}
                                height={Math.min(width*0.8*9/16, 360)}
                                />
                        </Grid>

                        <Grid item>
                            <Typography variant="body1">
                                {movieTitle}
                            </Typography>
                            <Typography variant="body2" >
                                {channelTitle}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                    
                <Grid item xs={12} md={3}>
                    <TagForm youtubeID={vid} tagType={tagType}/>    
                </Grid>
            </Grid>
        </>
    )
}
