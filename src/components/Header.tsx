import React, { useEffect } from 'react';
import axios from 'axios'
import { AppBar, Typography, Toolbar, Button, Grid, Container, makeStyles, Theme, createStyles } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
//import { UseGetUserInfo } from './customHooks'
import { refreshAccessToken } from '../components/modules'
import {updateAccessToken} from '../Action/userAction'
import { useErrorHandle } from './errorHandle';
import {rootUrl} from '../serverUrl'
import {setRedirectUrl} from '../Action/authAction'
import TwitterIcon from '../Twitter_Logo_WhiteOnBlue.png'

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root: {
            flexGrow: 1,
        },
        toolbar:{
            margin: "auto",
            maxWidth: 1080,
            width: "100%"
        },
        resistration:{
            margin: 'auto 0'
        },
        mypage:{
            margin: 'auto  0'
        },
        userName:{
            margin: 'auto',
            float: 'right',
            marginRight: 20,
        },
        twitterLogin:{
            marginLeft: theme.spacing(2),
            backgroundColor: "#1DA1F2",

            color: "#ffffff"
        },
        twitterIcon:{
            marginRight: theme.spacing(1),
        },
        userIcon:{
            width: 36,
            height: 36,
            marginTop: 0,
            marginBottom: 0,
            marginRight: 20,
            borderRadius: '50%'
        },
    })
)

/*
    export interface AxiosResponse<T> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    }
 */
const newAccessToken = async (refreshToken: string) => {
    const resAccessToken = await refreshAccessToken(refreshToken)
    return resAccessToken
}

const Header = () => {
    const history = useHistory()
    const location = useLocation()
    console.log({history, location})
    const userState = useSelector((state:any)=> state.userReducer)
    //const [userState, getUserInfo, loading, error] = useGetUserInfo()
    const dispatch=useDispatch()
    const [errorHandle] = useErrorHandle()

    console.log(userState)
    /*
    if(userState.accessExp < Date.now()/1000){
            newAccessToken(userState.refreshToken).then(resAccessToken => {
            console.log({resAccessToken})
            if(resAccessToken.data.status==="failed"){
                errorHandle(resAccessToken)
                return null
            }
            dispatch(updateAccessToken(resAccessToken.data.payload.access_token))
            //getUserInfo()
        })
    }
    */
    /*
    useEffect(()=>{
        //getUserInfo()
    }, [userState.accessToken])
    */

    const classes = useStyles()

    const twitterLogin = () => {
        const redirectPath = location.pathname + location.search
        dispatch(setRedirectUrl(redirectPath))
        window.location.href= rootUrl + "/auth/twitter"
    }

    const linkToTop = () => {
        history.push('/'+location.search)
    }

    return(
        <>
            <AppBar className={classes.root}>
                <Toolbar>
                    <Grid container className={classes.toolbar}>
                            <Typography variant="h6" onClick={linkToTop}>
                                    Vindex
                            </Typography>

                            
                            {userState.authenticated && (
                            <>
                            
                                <Button href="/registration" className={classes.resistration}>
                                    動画登録
                                </Button>

                                <Button href="/mypage" className={classes.mypage}>
                                    マイページ
                                </Button>
                                
                                    <Typography variant={'body1'} className={classes.userName}>
                                        {userState.userName}
                                    </Typography>
                                    <img src={userState.image} className={classes.userIcon}/>
                                </>
                            )}
                            {!userState.authenticated && (
                                <Button onClick={twitterLogin} variant={"outlined"} className={classes.twitterLogin}>
                                    <img src={TwitterIcon} width={25} className={classes.twitterIcon}/>
                                    Twitterでログイン
                                </Button>
                            )}
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header