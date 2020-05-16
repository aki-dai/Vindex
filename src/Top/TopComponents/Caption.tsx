import React from 'react';
import {Button, Typography, Grid} from '@material-ui/core/'
import VindexLogo from '../../Vindex_logo.png'

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
        <img src='./Vindex_logo.png' alt='Vindex' width={300} style={{margin:"0 auto",marginBottom: 20}}/>
        </>
    )
}

const ServiceCaption= () => {
    return(
        <>
            <Typography  variant="h5">
                YouTube上の動画をタグ付けして検索
            </Typography>
        </>
    )
}

const ResistButton = () => {
    return(
        <>
            <Button color="primary">
                アカウント登録
            </Button>
        </>
    )
}
