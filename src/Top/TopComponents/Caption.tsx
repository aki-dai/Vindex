import React from 'react';
import {Typography, Grid, makeStyles} from '@material-ui/core/'
import logo from '../../Vindex_logo.png'

export const Caption = () => {
    return(
        <>
            <Grid container justify="center" direction="column">
                <Logo />
                <ServiceCaption />
                {/*<ResistButton />*/}
            </Grid>
        </>
    )
}

const Logo = () => {
    return(
        <>
        {/*
            <Typography variant="h2">
                Vindex
            </Typography>
        */}
        <img src={logo} alt='Vindex' width={250} style={{margin:"0 auto",marginBottom: 20}}/>
        </>
    )
}

const useCaptionStyle = makeStyles(theme => ({
    caption:{   
        margin: "auto",
        [theme.breakpoints.up('md')]:{
            fontSize: "1.5rem",
        },
        
        [theme.breakpoints.down('sm')]:{
            fontSize: "1rem",
        }
    }
}))

const ServiceCaption= () => {
    const classes = useCaptionStyle()
    return(
        <>
            <Typography className={classes.caption}>
                YouTube上の動画をタグ付けして検索
            </Typography>
        </>
    )
}
/*
const ResistButton = () => {
    return(
        <>
            <Button color="primary">
                アカウント登録
            </Button>
        </>
    )
}*/
