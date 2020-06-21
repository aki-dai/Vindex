import React, { useState } from 'react'
import { Button, TextField, Typography, Grid, makeStyles } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory } from 'react-router';
import axios from 'axios';

import { useDispatch, useSelector } from "react-redux";
import {tagState} from '../../Reducer/tagReducer'
import {userState} from '../../Reducer/userReducer'
import {Tag, tagTypes} from '../../Action/actionTypes'
import {addTag, deleteTag} from '../../Action/tagAction'
import { updateAccessToken, signOut } from '../../Action/userAction';
import { refreshAccessToken } from '../../components/modules'
import {rootUrl} from '../../serverUrl'
import {useSearch} from '../../components/customHooks'

const tagSelector = (state :any) => {return state.tagReducer}
const userSelector = (state :any) => {return state.userReducer}

const TagFormat = (userID: string, userName: string, tagValue: string, youtubeID: string):Tag =>{
    return{       
        contributer : {
            userID  : userID,
            userName: userName,
        },
        value       : tagValue,
        youtubeID   : youtubeID,
    }
}

interface TagFormProps{
    youtubeID: string
    tagType: tagTypes
}

export const TagForm :React.FC<TagFormProps> = ({youtubeID, tagType}) => {
    const dispatch = useDispatch()
    const tagState:tagState = useSelector(tagSelector)
    const userState:userState = useSelector(userSelector)
    const setSearch = useSearch()

    const isMoviePage = (tagType === "movie") 
    const isEditPage = (tagType === "editor")
    const isAuthenticated = userState.authenticated

    const[TagTextField, setTextField] = useState<string>("")
    const[focusedTag, setFocusedTag] = useState<number>(-1)
    const[errorMessage, setError] = useState<string>("")
    const[isEditing, setEditing]=useState<boolean>(isEditPage)
    const[isNotificationModal, setNotificationModal] = useState<boolean>(false)
    let tags: Tag[]
    const history = useHistory()
    const isRegistered = tagState.editor.isRegistered

    if(isMoviePage) tags = tagState.movie.tags
    else if(isEditPage) tags = tagState.editor.tags
    else tags = []
    const userID = userState.userID
    const userName = userState.userName

    const changeTextField = (e:any) => {
            setTextField(e.target.value)
    }
    const onEnter = (e:any) => {
        if(e.keyCode===13){
            setNewTag()
        }
    }

    const setNewTag = () => {
        setError("")
        const replacedText = TagTextField.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, "_")
        if(replacedText.replace(/\s+/, "")==="") return null
        if(replacedText.length > 64){

            
        }
        if(tags.some(c => c.value === replacedText)){
            setError("重複するタグです")
            return null
        }
        if(tags.length >= 20){
            setError("これ以上タグを追加できません")
            return null
        }
        dispatch(addTag(TagFormat(userID, userName, replacedText, youtubeID), tagType))
        setTextField("")
    }

    const setToggleTagMenu = (index:number, query:string) => {
        if(isEditing) setFocusedTag(index)
        else setSearch(query, "Tag", 1)
    }

    const deleteTagAction = () => {
        dispatch(deleteTag(focusedTag, tagType))
        setFocusedTag(-1)
    }

    const postNewMovie = (accessToken:string, payload: tagState["movie"] | tagState["editor"], tagType:tagTypes) => {
        if(isEditPage && !isRegistered){
            return axios.post(rootUrl + '/movies/',{
                access_token: accessToken,
                youtube_id: youtubeID,
                payload: payload
            })
        }
        else{
            return axios.put(rootUrl + '/movies/' + youtubeID,{
                access_token: accessToken,
                youtube_id: youtubeID,
                payload: payload
            })
        }
    }

    //要リファクタリング
    const postNewTag = async () => {
        let sendData: tagState["movie"] | tagState["editor"]
        //if(tagType === "movie") sendData = tagState.movie
        //else sendData = tagState.editor
        sendData = (tagType === "movie")? tagState.movie : tagState.editor

        const accessToken = userState.accessToken
        const postResponce = await postNewMovie(accessToken, sendData, tagType)
        console.log(postResponce)
        if(postResponce.data.status === "failed"){
            switch(postResponce.data.error_code){
                case "001"://access token expired
                    console.log(postResponce.data.message)
                    const newAccessToken = await refreshAccessToken(userState.refreshToken)
                    console.log(newAccessToken)
                    if(newAccessToken.data.status === "success"){

                        const repostResponce = await postNewMovie(newAccessToken.data.payload.access_token, sendData, tagType)
                        if(repostResponce.data.status === "success"){
                           setNotificationModal(true)
                        }
                    }
                    dispatch(updateAccessToken(newAccessToken.data.payload.access_token))
                    break
                case "002":// refresh token expired
                    dispatch(signOut())       
                break
                case "011":// API TimeOut
                    setError("更新に失敗しました。\n時間をおいて再度お試しください。")
                    console.log(postResponce.data.message)
                break
                case "021":// API TimeOut
                    setError("更新に失敗しました。\n時間をおいて再度お試しください。")
                console.log(postResponce.data.message)
            break
                case "101"://unregistered movie
                    console.log(postResponce.data.message)
                break
            }
        }else if(postResponce.data.status==="success"){
            setNotificationModal(true)
        }
    }

    const TagUpdateModal:React.FC = () => {
        const closeModal = (e:any) => {
            setNotificationModal(false)
            e.stopPropagation();
        }
    
        return(
            <div onClick={closeModal}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    background: "rgba(0, 0, 0, 0.3)"
                }}
            >
                <div className="modal"
                    style={{
                        position: "fixed",
                        top: 350,
                        left: 0,
                        right: 0,
                        minWidth: 300,
                        maxWidth: 200,
                        maxHeight: 100,
                        overflow: "auto",
                        width: "90%",
                        margin: "auto",
                        padding: 15,
                        background: "rgba(255, 255, 255, 1)"
                    }}
                    onClick={(e)=>e.stopPropagation()}
                >
                    <Grid container justify={"center"}>
                        
                        <Typography variant={"body1"}>
                            タグを更新しました
                        </Typography>
                    </Grid>
                </div>
            </div>
        )
    }

    
    const MoviePostModal:React.FC = () => {
        const closeModal = (e:any) => {
            setNotificationModal(false)
            e.stopPropagation();
        }

        const redirectToTop = () => {
            history.push('/')
        }
    
        return(
            <div onClick={closeModal}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    background: "rgba(0, 0, 0, 0.3)"
                }}
            >
                <div className="modal"
                    style={{
                        position: "fixed",
                        top: 350,
                        left: 0,
                        right: 0,
                        minWidth: 300,
                        maxWidth: 200,
                        maxHeight: 100,
                        overflow: "auto",
                        width: "90%",
                        margin: "auto",
                        padding: 15,
                        background: "rgba(255, 255, 255, 1)"
                    }}
                    onClick={(e)=>e.stopPropagation()}
                >
                    <Grid container justify={"center"}>
                        <Grid item>
                            <Typography variant={"body1"}>
                                {((!isRegistered) ? "動画を登録しました！" : "タグを更新しました！")}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" onClick={redirectToTop}>
                                トップページに戻る
                            </Button>
                            <Button variant="outlined" onClick={closeModal}>
                                引き続き動画を登録する
                            </Button>
                        </Grid>

                    </Grid>
                </div>
            </div>
        )
    }

    const editButtonStyles = makeStyles(theme => ({
        editButton:{
            [theme.breakpoints.up('md')]:{
                fontSize: "1 rem",
            },
            
            [theme.breakpoints.down('sm')]:{
                fontSize: "0.8rem",
            }
        },
    }))

    const classes = editButtonStyles()

    return(
        <>
            <div style={{marginLeft: 20}}>
            {tags.map((value, index) => 
                <TagButton props={value.value} 
                           key={index}
                           isAuthenticated={isAuthenticated}
                           isToggled={(index===focusedTag)}
                           isEditing = {isEditing}
                           onClick={() => setToggleTagMenu(index, value.value)}
                           deleteTag={() => deleteTagAction()}/>
            )}
            {(isEditing  && isAuthenticated) && (
                <>
                    <TextField onChange={changeTextField} value={TagTextField} onKeyDown={onEnter} />
                    <Button variant="outlined" onClick={setNewTag} className={classes.editButton}>
                        タグを追加
                    </Button>
                    
                    <Button variant="outlined" onClick={postNewTag} className={classes.editButton}>
                        {(isMoviePage) ? "タグを保存" : "動画を登録" }
                    </Button>
                    {(isMoviePage) && (
                        <Button variant="outlined" onClick={()=>setEditing(false)} className={classes.editButton}>
                            編集を終了
                        </Button>
                    )}
                </>
            )}
            {(!isEditing && isAuthenticated) &&(
                <Button variant="outlined" onClick={()=>setEditing(true)} className={classes.editButton}>
                    タグを追加する
                </Button>
            )}
                
            {errorMessage}
            {(isNotificationModal && isMoviePage) && <TagUpdateModal />}
            {(isNotificationModal && isEditPage)  && <MoviePostModal />}
            </div>
        </>
    )
}

interface TagButtonProps {
    props: string
    isToggled: boolean
    isEditing: boolean
    isAuthenticated: boolean
    onClick: () => void
    deleteTag: () => void
}

const tagStyles = makeStyles(theme => ({
    tagButton:{
        backgroundColor: '#ffffff',
        display: 'inline-block',
        [theme.breakpoints.up('md')]:{
            fontSize: "1 rem",
        },
        
        [theme.breakpoints.down('sm')]:{
            fontSize: "0.8rem",
        }
    },
}))

const TagButton:React.FC<TagButtonProps> = ({props, isToggled, isEditing, isAuthenticated, onClick, deleteTag}) => {
    const classes = tagStyles() 
    const DeleteButton = () => {
        return(
            <>
                {isAuthenticated && <CancelIcon onClick={deleteTag}/>}
            </>
        )
    }
    /*
    const TagMenu = () => {
        const location = useLocation()
        const MenuStyle = {
            backgroundColor: "#eee",
            borderRadius   : 5,
        }
        const setSearch = useSearch()

        if(location.pathname==="/registration") return null
        else return(
            <div style={MenuStyle}>
                <span onClick={() => setSearch(props ,"Tag", 1)} style={{cursor: "pointer"}}>このタグで検索</span>
            </div>
        )
    }*/

    return(
        <>
            <div style={{margin: 6}} >
                <Button className={classes.tagButton} variant="contained" onClick={onClick}> 
                    {props}
                </Button>
                {(isToggled && isEditing) && <DeleteButton/>}
            </div>
            {/*(isToggled && isEditing)&& <TagMenu />*/}
        </>
    )
}

