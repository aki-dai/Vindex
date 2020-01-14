import {User, AUTH_USER, SET_USER_INFO, UPDATE_TOKEN, SIGN_OUT, LEAVE_USER, UserActionTypes} from './actionTypes'
import { Provider, useDispatch } from 'react-redux';
import Axios from 'axios';

/*
interface UserInfoResponse{
    status: "success" | "failed"
    payload: {
        userName: string
        nickName: string
        image   : string
    }&{
        error: string
    }
}
*/

export function authUser(accessToken:string, refreshToken:string, userID: string, provider: string): UserActionTypes{
   // const dispatch = useDispatch()
   // dispatch(setUserInfo(accessToken))
    return {
        type        : AUTH_USER,
        accessToken : accessToken,
        refreshToken: refreshToken,
        userID      : userID,
        provider    : provider
    }
}

export function setUserInfo(userName:string, nickName:string, image:string): UserActionTypes{
    return {
        type    : SET_USER_INFO,
        userName: userName,
        nickName: nickName,
        image   : image
    }

}



export function updateToken(accessToken:string, refreshToken:string): UserActionTypes{
    return {
        type        : UPDATE_TOKEN,
        accessToken : accessToken,
        refreshToken: refreshToken,
    }
}

export function signOut(): UserActionTypes{
    return {
        type    : SIGN_OUT,
    }
}

export function leaveUser(): UserActionTypes{

    return {
        type    : LEAVE_USER,
    }
}