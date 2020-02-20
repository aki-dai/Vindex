import React from 'react';
import { CardMedia, Typography, Button, Card, CardActions, CardContent, Container, makeStyles, Grid } from '@material-ui/core';
import { Link, useLocation, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ResultIndex, Tag } from '../../Action/actionTypes'
import { loadTag } from '../../Action/tagAction'

export const SearchWrapper = () => {
    const searchIndex:ResultIndex[] = useSelector((state:any) => state.searchReducer.searchResult)
    return(
        <>
            <SearchContainer props={searchIndex} />
        </>
    )
}

const useContainerStyles = makeStyles(theme => ({
    root:{
        alignItems: "flex-start",
        justify: "flex-start",
    }
}))

interface SearchContainerType {
    props:ResultIndex[]
}

const SearchContainer:React.FC<SearchContainerType> = ({props}) => {
    const classes = useContainerStyles()
    return(
        <>
            <Grid container className={classes.root}>
                {props.map((value:ResultIndex, index:number) => <SearchResult {...value} key={index}/>)}
            </Grid>
        </>
    )
}

const useCardStyles = makeStyles(theme => ({
    root:{
        maxWidth: 360,
        margin: '20 10px',
        display: 'inline-block',
    }
}))

const SearchResult:React.FC<ResultIndex> = (props) => {
    let location = useLocation()
    let history = useHistory()
    const vid: string = props.youtube_id
    const thumbUrl:string = props.thumbnail
    const classes = useCardStyles()
    const dispatch =  useDispatch()

    const LinkToMovie = () => {
        dispatch(loadTag(props.youtube_id,props.tags,'movie'))
        history.push('/watch/'+props.youtube_id, { background: location })
    }

    return(
        <>
            <Card className={classes.root}>
                <div onClick={() => LinkToMovie()}>
                    <Thumbnail url={thumbUrl} />
                    <MovieInfo title={props.title} channelName={props.channelName} />
                </div>
                <Tags tags={props.tags}/>
            </Card>
        </>
    )
}

interface ThumbnailProps{
    url: string
}

const Thumbnail: React.FC<ThumbnailProps> = ({url}) => {
    return(
        <>
            <CardMedia        
                component="img"
                image = {url}
            />
        </>
    )
}
interface MovieInfoProps{
    title:string
    channelName: string
}

const MovieInfo:React.FC<MovieInfoProps> = ({title, channelName}) => {
    return(
        <>
            <CardContent>
                <Typography>
                    {title}
                </Typography>
                <Typography>
                    {channelName}
                </Typography>          
            </CardContent>
        </>
    )
}

interface TagsProp{
    tags: Tag[]
}

const Tags:React.FC<TagsProp> = ({tags}) => {

    return(
        <>  
                {tags.map((tag, index) => {
                    return(
                        <Button key={index}>
                            {tag.value}
                        </Button>
                    )
                })}
        </>
    )
}