import {APIStatus, UserActionTypes} from '../Action/actionTypes'

export interface userStateTypes{
    status: APIStatus
    authenticated: boolean
    accessToken: string
    refreshToken: string
    userID: string
    userName: string
    nickName: string
    provider: string
    image: string
    accessExp: Date | null
    error: string
}

export const initialState: userStateTypes = {
    status: 'initial',
    authenticated: false,
    accessToken: "",
    refreshToken: "",
    userID: "",
    userName: "",
    nickName: "",
    provider: "",
    image: "",
    accessExp: null,
    error: ""
}

const userReducer = (state = initialState, action:UserActionTypes) => {
    switch(action.type) {
        case "AUTH_USER":{
            return{
                ...state,
                authenticated   : true,
                accessToken     : action.accessToken,
                refreshToken    : action.refreshToken,
                provider        : action.provider, 
                userID          : action.userID,
                accessExp       : action.accessExp,
                status          : 'waiting'
            }        
        }
        case "GET_USER_INFO":{
            return{
                ...state,
                status: 'loading'
            }
        }
        case "SET_USER_INFO":{
            return{
                ...state,
                userName: action.userName,                
                nickName: action.nickName, 
                image   : action.image,
                status  : 'complete'
            }        
        }

        case "UPDATE_ACCESS_TOKEN":{
            return{
                ...state,
                accessToken     : action.accessToken,
                accessExp       : action.accessExp,
            }        
        }

        case "UPDATE_TOKENS":{
            return{
                ...state,
                accessToken     : action.accessToken,
                refreshToken    : action.refreshToken,
                accessExp       : action.accessExp,
            }        
        }
        
        case "SIGN_OUT":{
            return{
                initialState
            }        
        }

        case "LEAVE_USER":{
            return{
                initialState
            }        
        }

        default: {return state}
    }
}


export default userReducer