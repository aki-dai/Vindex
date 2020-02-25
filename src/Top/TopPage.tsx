import React from 'react';
import { Caption } from './TopComponents/Caption'
import { SearchBox } from '../components/SearchBox'
import Header from '../components/Header'
import { Container, Grid, Box } from '@material-ui/core';
import { NewMovies } from './TopComponents/NewMovies';

export const Top = () => {
    return(
        <>
            <Grid container justify={"center"}>
                <Grid item>
                    <Caption />
                    <SearchBox />
                </Grid>
                <Grid item>            
                    <NewMovies/>
                </Grid>
            </Grid>
        </>
    )
}
