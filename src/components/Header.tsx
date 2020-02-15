import React, { useEffect } from 'react';
import axios from 'axios'
import { AppBar, Typography, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserInfo } from './customHooks'
import { refreshAccessToken } from '../components/modules'
import {updateAccessToken} from '../Action/userAction'
import { useErrorHandle } from './errorHandle';
import {rootUrl} from '../serverUrl'

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";


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
    //const userState = useSelector((state:any)=> state.userReducer)
    const [userState, getUserInfo, loading, error] = useGetUserInfo()
    const dispatch=useDispatch()
    const [errorHandle] = useErrorHandle()

    console.log(userState)
    if(userState.accessExp < Date.now()/1000){
            newAccessToken(userState.refreshToken).then(resAccessToken => {
            console.log({resAccessToken})
            if(resAccessToken.data.status==="failed"){
                errorHandle(resAccessToken)
                return null
            }
            dispatch(updateAccessToken(resAccessToken.data.payload.access_token))
            getUserInfo()
        })
    }
    useEffect(()=>{
        //getUserInfo()
    }, [userState.accessToken])

    const twitterLogin = () => {
        window.location.href= rootUrl + "/auth/twitter"
    }

    const linkToTop = () => {
        history.push('/'+location.search)
    }

    return(
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" onClick={linkToTop}>
                            Vindex
                    </Typography>

                    <Button onClick={twitterLogin}>
                        TwitterLogin
                    </Button>
                    
                    <Button href="/registration">
                        動画登録
                    </Button>

                    <Button href="/mypage">
                        マイページ
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header