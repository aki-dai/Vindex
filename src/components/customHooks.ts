import { useState, useCallback, Dispatch, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { getUserInfoStart ,setUserInfo, updateAccessToken} from "../Action/userAction";
import { fetchMovie } from '../Action/tagAction'
import { SearchStart, SearchComplete, SearchErrorAction} from '../Action/searchAction'
import { rootUrl } from '../serverUrl'
import queryString from 'query-string'
import { useHistory } from 'react-router'
import { SearchSubmit } from '../Action/searchAction'


export const useSearch = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const setSearch = (searchWord:string, searchScope:string) => {
        if (searchWord == "") return null
        
        const queryObject = {
            q: searchWord.split(/\s+/),                                                       
            t: searchScope                                                                                         
        }
        const queryUrl:string = queryString.stringify(queryObject, {arrayFormat: 'comma'})
        dispatch(SearchSubmit(searchWord, 'latest'))
        history.push('/search?' + queryUrl)
    }
    return setSearch
}


/*export const useGetUserInfo = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const userState = useSelector((state:any) => state.userReducer)
    const dispatch = useDispatch()
    const accessToken = userState.accessToken

    const getUserInfo = useCallback(async () => {
        //if(userState.authenticated) return null
        setLoading(true)
        try{
            const result = await Axios.get(rootUrl + "/users/",{
                params: {
                    access_token: accessToken
                }})
            setLoading(false)
            if(result.data.status = "success"){
                console.log({result})
                const userName = result.data.payload.userName
                const nickName = result.data.payload.nickName
                const image = result.data.payload.image
                dispatch(setUserInfo(userName, nickName, image))
            }
            else throw new Error(result.data.payload.error)
        }catch(error){
            setLoading(false)
            const {status, statusText} = error.response
            console.log(status, statusText)
            setError(statusText)
        }
    }, [])
    return [userState, getUserInfo, loading, error]
}*/

export const UserInfoEffect = () => {
    const userState = useSelector((state:any) => state.userReducer)
    const dispatch = useDispatch()
    const accessToken = userState.accessToken
    const refreshToken = userState.refreshToken
    const accessExp = userState.accessExp

    useEffect(()=>{
        (async ()=>{
            if (userState.status !=='waiting') return
            dispatch(getUserInfoStart())
            console.log()
            try{
                const userInfoResult = await Axios.get(rootUrl + "/users/", {
                    params:{
                        access_token: accessToken
                }})                
                const userName = userInfoResult.data.payload.userName
                const nickName = userInfoResult.data.payload.nickName
                const image    = userInfoResult.data.payload.image
                dispatch(setUserInfo(userName, nickName, image))
            }catch(error){
                console.log(error)
            }
        }
    )()},[userState])
    
    useEffect(()=>{
        (async ()=>{
            if (accessExp >= Date.now()/1000) return
            dispatch(getUserInfoStart())
            try{
                const accessTokenResult = await Axios.put(rootUrl + '/users/',{
                    refresh_token: refreshToken
                })
                if(accessTokenResult.data.status==="failed"){
                    console.log(accessTokenResult.data)
                    return null
                }
                dispatch(updateAccessToken(accessTokenResult.data.payload.access_token))
            }catch(error){
                console.log(error)
            }
        }
    )()},[userState])
    return null
}

export const useMovieInfo = () =>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const userState = useSelector((state:any) => state.userReducer)
    const movieState = useSelector((state:any) => state.movieFetchReducer)
    const dispatch = useDispatch()

    const getMovieInfo = useCallback(async (youtubeID: string, youtubeUrl :string) => {
        if(!userState.authenticated || !youtubeID) return null
        const fetchURL: string = rootUrl + "/movie_fetch/"+youtubeID
        setLoading(true)

        try{
            const result = await Axios.get(fetchURL)
            setLoading(false)
            if(result.data.status = "success"){
                console.log({result})
                dispatch(fetchMovie(youtubeID, result.data.payload.title, result.data.payload.channelName, youtubeUrl))
            }
        }catch(error){
            setLoading(false)
            const {status, statusText} = error.response
            console.log(status, statusText)
            setError(statusText)
        }
    }, [loading, error, userState])
    return [movieState, getMovieInfo, loading, error]
}

type APIStatus = 'initial' | 'waiting' | 'loading' | 'complete' | 'error'

export const SearchEffect = () => {
    const searchState = useSelector((state:any) => state.searchReducer)
    const dispatch = useDispatch()
    const status = searchState.searchStatus
    const query = searchState.query
    const sort = searchState.sort
    useEffect(() => { 
        (async () => {
            if (status !== 'waiting') return
            dispatch(SearchStart())
            try{
                const searchResult = await Axios.get(rootUrl + "/search",
                    {
                        params:{
                            q: query
                    }})
                dispatch(SearchComplete(query, 
                                        sort, 
                                        searchResult.data.payload.count,
                                        searchResult.data.payload.results))
                
            }catch(error){
                dispatch(SearchErrorAction(query, 
                                           sort,  
                                           error))
            }
        }
    )()}, [query, status])
    return null
}
