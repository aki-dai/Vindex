import React, { useEffect } from 'react';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import ReactPlayer from 'react-player'
import { useParams } from 'react-router';
import { TagForm } from './WatchComponents/TagForm';
import { tagTypes } from '../Action/actionTypes'
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

const useWatchPageStyle = makeStyles(theme => ({
    movieTitle:{
        [theme.breakpoints.up('md')]:{
            fontSize: "1rem",
        },
        
        [theme.breakpoints.down('sm')]:{
            fontSize: "0.9rem",
        }
    },
}))

export const Watch:React.FC<WatchPageProps> = ({youtubeID, title, channelName, tagType}) => {
    let urlParams= useParams<RouteParams>()
    let vid: string
    const tagState = useSelector((state:any) => state.tagReducer)
    const dispatch = useDispatch()
    if(urlParams.id) vid = urlParams.id
    else if(youtubeID) vid = youtubeID
    else vid = ""
    let width = window.innerWidth
    let movieTitle = (tagType === "movie") ? tagState.movie.title : tagState.editor.title 
    let channelTitle = (tagType === "movie") ? tagState.movie.channelName : tagState.editor.channelName
    
    const classes = useWatchPageStyle()

    useEffect(() => {
        if(tagType === "movie" && tagState.movie.youtubeID !== vid){
            Axios.get( 
                    rootUrl + "/movies/" + vid
                ).then((res) => {
                    const status = res.data.status
                    if(status === "success"){
                        dispatch(loadTag(vid, res.data.payload.tag, tagType))
                    }else if(res.data.error_code === "010"){
                        dispatch(loadTag(vid, [], tagType))    
                    }
                }).catch((error) => {
                    //console.log({error})
                })
            }
            if(tagType === "editor" && tagState.editor.youtubeID !== vid){
                 Axios.get( 
                         rootUrl + "/movies/" + vid
                     ).then((res) => {
                         const status = res.data.status
                         if(status === "success"){
                             dispatch(loadTag(vid, res.data.payload.tag, tagType))
                         }else if(res.data.error_code === "010"){
                             dispatch(loadTag(vid, [], tagType))    
                         }
                     }).catch((error) => {
                         //console.log({error})
                     })
             }
        },[vid, dispatch, tagState.editor.youtubeID, tagState.movie.youtubeID, tagType])
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
                                width={Math.min(width*0.8, 640)}
                                height={Math.min(width*0.8*9/16, 360)}
                                />
                        </Grid>

                        <Grid item>
                            <Typography variant="body1" className={classes.movieTitle}>
                                {movieTitle}
                            </Typography>
                            <Typography variant="body2" className={classes.movieTitle}>
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
