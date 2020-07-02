import React from 'react';
import { SearchBox } from '../components/SearchBox'
import { SearchConditions } from './SearchComponent/SearchConditions'
import { SearchWrapper } from './SearchComponent/SearchResults'
import { SearchEffect, TitleChangeEffect } from '../components/customHooks'

import { Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

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
    const query: string = useSelector((state:any) => state.searchReducer.query)
    return(
        <>
        
          <TitleChangeEffect title={`${query} - Vindex`} />
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