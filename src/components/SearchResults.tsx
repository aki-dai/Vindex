import React from 'react';
import { CardMedia, Typography, Button, Card, CardContent, makeStyles, Grid } from '@material-ui/core';
import { useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ResultIndex, Tag } from '../Action/actionTypes'
import { loadTag, loadMovieInfo } from '../Action/tagAction'
import { changePage } from '../Action/searchAction'
import { useSearch } from './customHooks';
import Pagination from '@material-ui/lab/Pagination';

const useContainerStyles = makeStyles(theme => ({
    root:{
        maxWidth: 270*4,
        justify: "center",
    },
    pagination:{
        marginBottom: 8,
    }
}))

interface SearchContainerType {
    props:ResultIndex[]
    count: number
    page: number
    option?: string
}

export const SearchContainer:React.FC<SearchContainerType> = ({props, count, page, option}) => {
    const classes = useContainerStyles()
    const p_count:number = Math.floor((count-1) / 20) + 1
    const dispatch =  useDispatch()
    const setSearch = useSearch()
    const query: string = useSelector((state:any) => state.searchReducer.query)
    const pageTrans = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(changePage(value))
        setSearch(query, "Tag", value, true)
    }
    return(
        <>
            <Grid container className={classes.root}>
                {(option !== "latest") &&
                (<Grid item className={classes.pagination}>
                    <Pagination count={p_count} page={page} onChange={pageTrans}/>
                </Grid>)}
                <Grid container alignItems="flex-start" justify="flex-start">                                       
                    {props.map((value:ResultIndex, index:number) => <SearchResult {...value} key={index}/>)}
                </Grid>
                
                {(option !== "latest") &&
                (<Grid item className={classes.pagination}>
                    <Pagination count={p_count} page={page} onChange={pageTrans}/>
                </Grid>)}
            </Grid>
        </>
    )
}

const useCardStyles = makeStyles(theme => ({
    container:{
        margin: '0px',
        justify: 'center',
        display: 'inline-block',
    },
    card:{
        maxWidth: 270,
        margin: '0px',
        display: 'inline-block',
    },
    link:{
        cursor: "pointer",
    }
}))

const SearchResult:React.FC<ResultIndex> = (props) => {
    let location = useLocation()
    let history = useHistory()
    const thumbUrl:string = props.thumbnail
    const classes = useCardStyles()
    const dispatch =  useDispatch()

    const LinkToMovie = () => {
        dispatch(loadTag(props.youtube_id, props.tags,'movie'))
        dispatch(loadMovieInfo(props.youtube_id, props.channel_name, props.title))
        history.push('/watch/'+props.youtube_id, { background: location })
    }

    return(
        <>
                <Grid item className={classes.container}>
                    <Card className={classes.card}>
                        <div onClick={() => LinkToMovie()} className={classes.link}>
                            <Thumbnail url={thumbUrl} />
                            <MovieInfo title={props.title} channelName={props.channel_name} />
                        </div>
                        <Tags tags={props.tags}/>
                    </Card>
                </Grid>
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


const useTextStyles = makeStyles(theme => ({
    movieTitle:{
        [theme.breakpoints.up('md')]:{
            fontSize: "0.9rem",
        },
        
        [theme.breakpoints.down('sm')]:{
            fontSize: "0.8rem",
        }
    },
}))


const MovieInfo:React.FC<MovieInfoProps> = ({title, channelName}) => {
    const classes = useTextStyles()
    return(
        <>
            <CardContent>
                <Typography variant="body1" className={classes.movieTitle}>
                    {title}
                </Typography>
                <Typography variant="body2" className={classes.movieTitle}>
                    {channelName}
                </Typography>          
            </CardContent>
        </>
    )
}

interface TagsProp{
    tags: Tag[]
}


const useTagStyles = makeStyles(theme => ({
    tag:{
        backgroundColor: '#ffffff',
        margin: '2px',
        display: 'inline-block',
        
        [theme.breakpoints.up('md')]:{
            fontSize: "0.8rem",
        },
        
        [theme.breakpoints.down('sm')]:{
            fontSize: "0.7rem",
        }
    },
}))


const Tags:React.FC<TagsProp> = ({tags}) => {
    const setSearch = useSearch()
    const classes = useTagStyles()
    return(
        <>  
                {tags.map((tag, index) => {
                    return(
                        <Button variant="contained" size="small" className={classes.tag} onClick={() => setSearch(tag.value, "Tag", 1)} key={index}>
                            {tag.value}
                        </Button>
                    )
                })}
        </>
    )
}