import React from 'react'
/*List, ListItem, ListItemText,*/
import { Grid, makeStyles, createStyles, Theme, Typography, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux';
import {signOut} from '../Action/userAction'
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
            width: '100%',
            justify: "center",
            minWidth: 270,
            maxWidth: 1080,
        },
        menuContainer:{
            justify: "center",
            width: '15vw',
            maxWidth: 270,
            padding: 10,
        },
        profileContainer:{
            justify: "center",
            width: '45vw',
            maxWidth: 810,
            padding: 10,
        },
        menuList:{
            background: '#cccccc',
            borderRadius: 15,
            width: "100%",
            height: "100%",
        },
        profile:{
            background: '#cccccc',
            borderRadius: 15,
            width: "100%",
            height: "120%",
            alignItems: "center",
        },
        icon: {
            display: 'inline-block',
            borderRadius: '50%',
            width: 100,
            marginRight: 20,
        },
        name:{
            display: 'inline-block',
            marginLeft: 20,
        },
        logoutButton:{
            backgroundColor: '#e4a555',
            width: "95%",
            margin:"0 auto",
        }
    })
)

export const MyPage = () => {
    const classes = useStyles()
    const userState = useSelector((state:any) => state.userReducer)
    if(userState.authenticated){
        return(
            <>
                <Grid container className={classes.root} spacing={2}>
                    {/*<Grid container item xs={12} md={3} className={classes.menuContainer}>
                        <Menu />
                    </Grid>*/}
                    <Grid container item xs={12} md={12} className={classes.profileContainer}>
                        <MyProfile />
                    </Grid>
                </Grid>
            </>
        )
    } else {
        return(
        <>
            <p>マイページの閲覧には、ログインが必要です。</p>
        </>
        )
    }

}
/*
const Menu:React.FC = () => {
    const classes = useStyles()
    return(
        <>
            <div className={classes.menuList}>
                <List component="nav">
                    <ListItem button>
                        <ListItemText primary="登録した動画" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="登録したタグ" />
                    </ListItem>
                </List>
            </div>
        </>
    )
}*/


const MyProfile:React.FC = () => {
    const history = useHistory()
    const classes = useStyles()
    const userState = useSelector((state:any) => state.userReducer)
    const dispatch = useDispatch()
    const iconUrl: string = userState.image
    const name: string = userState.userName

    const logOut = () => {
        dispatch(signOut())
        history.push('/')
    }
    return(
        <>
            <Grid container className={classes.profile} > 
                <Grid container justify={"space-between"} alignItems={"center"} direction="row">
                    <Grid item>
                        <Typography variant="h5" className={classes.name}>
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <img src={iconUrl} className={classes.icon} alt="User Icon"/>
                    </Grid>
                </Grid>
                <Grid container>
                    <Button onClick={logOut} className={classes.logoutButton}>
                        ログアウト
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}