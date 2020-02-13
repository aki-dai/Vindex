import React from 'react';
import { CardMedia, Typography, Button, Card, CardActions, CardContent } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SearchIndex, Tag } from '../../Action/actionTypes'

export const SearchResults = () => {
    const searchIndex = useSelector((state:any) => state.searchReducer.searchResult)
    console.log({searchIndex})
    return(
        <>
            {searchIndex.map((value:SearchIndex) => <SearchResult {...value} />)}
            
        </>
    )
}

const SearchResult:React.FC<SearchIndex> = (props) => {
    let location = useLocation()
    const vid: string = props.youtube_id
    const thumbUrl:string = "http://img.youtube.com/vi/"+ vid  +"/mqdefault.jpg"
    return(
        <>
            <Card>
                <Link to={{pathname: `/watch/` + vid,
                           state:   { background: location }
                        }}
                    >
                    <Thumbnail url={thumbUrl} />
                    <MovieInfo title={props.title} channelName={props.channelName} />
                </Link>
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
            <CardActions>
                {tags.map((tag) => {
                    return(
                        <Button>
                            {tag.value}
                        </Button>
                    )
                })}
            </CardActions>
        </>
    )
}