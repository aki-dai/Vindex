import axios from 'axios'
import {rootUrl} from '../serverUrl'

export const decodeJwt = (token:string) => {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(decodeURIComponent(escape(window.atob(base64)))); 
}


export const refreshAccessToken = (refreshToken: string) => {
    return axios.put(rootUrl + '/users/',{
            refresh_token: refreshToken
        })
}
    
