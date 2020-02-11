import React, { useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import ReactPlayer from 'react-player'
import { useParams } from 'react-router';
import { TagForm } from './WatchComponents/TagForm';
import {RouteComponentProps} from 'react-router-dom'
import { tagTypes, Tag } from '../Action/actionTypes'
import Axios from 'axios';

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
    let tags: Tag
    if(urlParams.id) vid = urlParams.id
    else if(youtubeID) vid = youtubeID
    else vid = ""
    useEffect(() => {
        if(tagType === "movie"){
            Axios.get("http://localhost:3000/api/v1/movie/", {
                params:{
                    youtube_id: vid
                }
            }).then((res) => {
                title = res.data.payload.movie.title
                channelName = res.data.payload.movie.channelName
                tags = res.data.payload.tag
            })
        }
    },[vid])
    let url:string = "https://www.youtube.com/watch?v=" + vid

       console.log({youtubeID, title, channelName, tagType, urlParams, url})
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
            <Container maxWidth="lg">
                <Grid container direction="row" >
                    <Grid item xs={12} md={9}>
                        <Grid container direction="column">
                            <Grid item>
                                <ReactPlayer 
                                    url={url}
                                    config={config}/>
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
            </Container>
        </>
    )
}
