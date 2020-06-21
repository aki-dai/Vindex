import React, {useState} from 'react';
import axios from 'axios'
import { AppBar, Typography, Toolbar, Button, Grid, makeStyles, Theme, createStyles, IconButton, Hidden, ListItem, ListItemText, SwipeableDrawer } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
//import { UseGetUserInfo } from './customHooks'
import {rootUrl} from '../serverUrl'
import {setRedirectUrl} from '../Action/authAction'
import MenuIcon from '@material-ui/icons/Menu';
import TwitterIcon from '../Twitter_Logo_WhiteOnBlue.png'
import logo from '../Vindex_logo.png'

axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

const useStyles = makeStyles((theme: Theme)=>
    createStyles({
        root: {
            flexGrow: 1,
            backgroundColor: "#e0e0e0"
        },
        toolbar:{
            margin: "auto",
            maxWidth: 1080,
            width: "100%",
        },
        headerLink:{
            margin: 'auto 0',
            marginLeft: 10,
        },
        resistration:{
            
        },
        mypage:{
        },
        userName:{
            margin: 'auto',
            float: 'right',
            marginRight: 20,
        },
        userNameDrawer:{
            margin: 'auto',
            float: 'left',
            marginTop: 5,
            marginLeft: 20,
            marginRight: 20,
        },
        twitterLogin:{
            marginLeft: theme.spacing(2),
            backgroundColor: "#1DA1F2",
            color: "#ffffff",
            width: 200
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
        logo:{
            cursor: "pointer",
            margin:'auto 0', 
        },
        list:{
            width:200,
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

/*
const newAccessToken = async (refreshToken: string) => {
    const resAccessToken = await refreshAccessToken(refreshToken)
    return resAccessToken
}*/

const Header = () => {
    const history = useHistory()
    const location = useLocation()
    //console.log({history, location})
    const userState = useSelector((state:any)=> state.userReducer)
    //const [userState, getUserInfo, loading, error] = useGetUserInfo()
    const dispatch = useDispatch()
    //const [errorHandle] = useErrorHandle()
    const [drawerState, setDrawerState] = useState<boolean>(false)
    let iOS = false

    if (typeof window !== "undefined"){
        iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    }

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

    //console.log(drawerState)
    const toggleDrawer = (open: boolean) => (event: React.MouseEvent | React.KeyboardEvent ) => {
        setDrawerState(open);
    } 
    const classes = useStyles()

    const twitterLogin = () => {
        const redirectPath = location.pathname + location.search
        dispatch(setRedirectUrl(redirectPath))
        window.location.href= rootUrl + "/auth/twitter"
    }

    const linkToTop = () => {
        history.push('/'+location.search)
    }
    
    const DrawerMenu = () => {
        return(
            <div onClick={toggleDrawer(false)} role="presentation" className={classes.list}>
                <ListItem button component="a" href="/about">
                    <ListItemText primary={"このサイトについて"}/>
                </ListItem>
                <ListItem button component="a" href="/update">
                    <ListItemText primary={"更新情報"}/>
                </ListItem>
                {
                    userState.authenticated && (
                        <>
                            <ListItem button component="a" href="/registration">
                                <ListItemText primary={"動画登録"}/>
                            </ListItem>
                            <ListItem button component="a" href="/mypage">
                                <ListItemText primary={"マイページ"}/>
                            </ListItem>
                            <Typography variant={'body1'} className={classes.userNameDrawer}>
                                        {userState.userName}
                            </Typography>
                            <img alt="Icon" src={userState.image} className={classes.userIcon}/>
                        </>
                    )
                }                            
                {!userState.authenticated && (
                    <ListItem button onClick={twitterLogin} className={classes.twitterLogin}>
                        <img alt = "Icon" src={TwitterIcon} width={25} className={classes.twitterIcon}/>
                        Twitterでログイン
                    </ListItem>
                )}
            </div>
        )
    }

    return(
        <>
            <AppBar className={classes.root}>
                <Toolbar>
                    <Grid container className={classes.toolbar}>
                        {/*
                            <Typography variant="h6" onClick={linkToTop} className={classes.logo}>
                                    Vindex
                            </Typography>
                        */}
                        <Hidden mdUp>
                            <IconButton onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            <SwipeableDrawer disableBackdropTransition={!iOS} 
                                            disableDiscovery={iOS} 
                                            anchor={"left"} 
                                            open={drawerState} 
                                            onClose={toggleDrawer(false)}
                                            onOpen={toggleDrawer(true)}>
                                {DrawerMenu()}
                            </SwipeableDrawer>
                        </Hidden>

                        <span onClick={linkToTop} className={classes.logo}>
                            <img src={logo} alt='Vindex' width={100} height={100/720*170}   />
                        </span>
                        <Hidden smDown>                        
                            <Button href="/about" className={classes.headerLink}>
                                このサイトについて
                            </Button>

                            <Button href="/update" className={classes.headerLink}>
                                更新情報
                            </Button>

                            
                            {userState.authenticated && (
                            <>
                            
                                <Button href="/registration" className={classes.resistration && classes.headerLink}>
                                    動画登録
                                </Button>

                                <Button href="/mypage" className={classes.mypage && classes.headerLink}>
                                    マイページ
                                </Button>
                                
                                    <Typography variant={'body1'} className={classes.userName}>
                                        {userState.userName}
                                    </Typography>
                                    <img alt = "Icon" src={userState.image} className={classes.userIcon}/>
                                </>
                            )}
                            {!userState.authenticated && (
                                <Button onClick={twitterLogin} variant={"outlined"} className={classes.twitterLogin}>
                                    <img src={TwitterIcon} width={25} className={classes.twitterIcon} alt={"Login"}/>
                                    Twitterでログイン
                                </Button>
                            )}

                        </Hidden>

                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
