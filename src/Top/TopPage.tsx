import React from 'react';
import { Caption } from './TopComponents/Caption'
import { SearchBox } from '../components/SearchBox'
import { Grid, makeStyles, Theme, createStyles } from '@material-ui/core';
import { NewMovies } from './TopComponents/NewMovies';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        top:{
        },
        content:{
            marginTop: 40,
        }
    })
)

export const Top = () => {
    const classes = useStyles()
    return(
        <>
            <Grid container justify={"center"} >
                <Grid item className={classes.top}>
                        <Caption />
                        <SearchBox />
                </Grid>

                <Grid item className={classes.content}>            
                    <NewMovies/>
                </Grid>
            </Grid>
        </>
    )
}
