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

    console.log({tagState,  })
    useEffect(() => {
        if(tagType === "movie" && tagState.movie.youtubeID !== vid){
            Axios.get( 
                    rootUrl + "/movies/" + vid
                ).then((res) => {
                    tags = res.data.payload.tag
                    console.log({res, tags})
                    dispatch(loadTag(vid, tags, tagType))
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

    return(
        <>
            <Grid container direction="row" >
                <Grid item xs={12} md={9}>
                    <Grid container direction="column">
                        <Grid item>
                            <ReactPlayer 
                                url={url}
                                config={config}
                                width={640}
                                />
                        </Grid>

                        <Grid item>
                            <Typography variant="body1">
                                {title}
                            </Typography>
                            <Typography variant="body1">
                                {channelName}
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
