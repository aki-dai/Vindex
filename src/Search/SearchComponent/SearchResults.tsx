import React from 'react';
import { CardMedia, Typography, Button, Card, CardActions, CardContent, Container, makeStyles, Grid } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SearchIndex, Tag } from '../../Action/actionTypes'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    cards: {
      width: 400,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));
  

export const SearchContainer = () => {
    const searchIndex = useSelector((state:any) => state.searchReducer.searchResult)
    const classes = useStyles()
    return(
        <>
            <Container maxWidth="lg" className={classes.root}>
                <Grid container justify="center">
                    {searchIndex.map((value:SearchIndex) => <SearchResult {...value} />)}
                </Grid>
            </Container>            
        </>
    )
}

const SearchResult:React.FC<SearchIndex> = (props) => {
    let location = useLocation()
    const vid: string = props.youtube_id
    const thumbUrl:string = props.thumbnail
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