import {AuthAction, AUTH} from './actionTypes'

export function setRedirectUrl(url: string):AuthAction {
    return{
        type: AUTH,
        url: url,
    }
}