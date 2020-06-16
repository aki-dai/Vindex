import React from 'react';
import { SearchBox } from '../components/SearchBox'
import { SearchConditions } from './SearchComponent/SearchConditions'
import { SearchWrapper } from './SearchComponent/SearchResults'
import { SearchEffect } from '../components/customHooks'

import queryString from 'query-string';

import Header from '../components/Header'
import { Container, Grid, Box, makeStyles } from '@material-ui/core';
import { useParams } from 'react-router';

const useStyles = makeStyles(theme => ({
    root:{
        width: "100%",
    },
    container:{
        width: "100%",
        maxWidth: 270*4,
        justify: "flex-start",
        paddingLeft: 24,
        paddingBottom: 8,
    }
}))

export const Search: React.FC = () => {
    const classes = useStyles()
    return(
        <>
            <Grid container className = {classes.root}>
                <SearchEffect />
                <Grid container className = {classes.container}>
                    <Grid item>
                        <SearchBox />
                        <SearchConditions />
                    </Grid>
                </Grid>
                <SearchWrapper />
            </Grid>
        </>
    )
}