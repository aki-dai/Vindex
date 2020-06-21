import React, { useEffect, useState } from 'react'
import {SearchContainer} from '../../components/SearchResults'
import Axios from 'axios'
import { rootUrl } from '../../serverUrl'
import { ResultIndex } from '../../Action/actionTypes'
import { Typography, Grid, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root:{
        maxWidth: 270*4,
        justify: "center",
    },
}))


export const NewMovies = () => {
    const [results, setResults] = useState<ResultIndex[]>([])
    useEffect(() => {        
        Axios.get(rootUrl+'/search/latest')
            .then(latestMovies => {
                if(latestMovies.data.status === "success"){
                    setResults(latestMovies.data.payload.results)
            }})
    }, [])
    const classes = useStyles()
    console.log(results)
    return(
        <>
            <Grid container className={classes.root}>
                <Grid item>
                    <Typography variant={"h5"} >
                        新着動画
                    </Typography>
                </Grid>
                <Grid item>
                    <SearchContainer props={results} count={20} page={1} option={"latest"} />
                </Grid>
            </Grid>
        </>
    )
}