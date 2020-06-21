import { useState, useCallback, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { getUserInfoStart ,setUserInfo, updateAccessToken} from "../Action/userAction";
import { fetchMovie } from '../Action/tagAction'
import { SearchStart, SearchComplete, SearchErrorAction} from '../Action/searchAction'
import { rootUrl } from '../serverUrl'
import queryString from 'query-string'
import { useHistory } from 'react-router'
import { SearchSubmit } from '../Action/searchAction'
import { sortType } from "../Action/actionTypes";


export const useSearch = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const searchState = useSelector((state:any) => state.searchReducer)
    const defaultWord:string = searchState.query
    const refine:boolean = searchState.andSearch
    const sort:sortType = searchState.sort
    const andQuery = (refine === true) ? "true" : "false"
    
    const setSearch = (searchWord:string = defaultWord, searchScope:string = "Tag", page:number, pagenation?: boolean) => {
        let isPagenation = false;
        if (searchWord === "") return null
        if (pagenation) isPagenation = true

        const queryObject = {
            q: searchWord.split(/\s+/),                                                       
            t: searchScope,
            a: andQuery,
            s: sort,
            p: String(page),                                                                           
        }        
        console.log({queryObject})
        const queryUrl:string = queryString.stringify(queryObject, {arrayFormat: 'comma'})

        dispatch(SearchSubmit(searchWord, sort, isPagenation))
        history.push('/search?'+queryUrl)
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
    const isAuthenticated = userState.authenticated

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
    )()},[
        dispatch, accessToken, userState.status
    ])
    
    useEffect(()=>{
        (async ()=>{
            if (userState.status !== 'waiting' || accessExp >= Date.now()/1000 || !isAuthenticated) return null
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
    )()},[userState, accessExp, dispatch, isAuthenticated, refreshToken])
    return null
}

export const useMovieInfo = () =>{
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const userState = useSelector((state:any) => state.userReducer)
    const movieState = useSelector((state:any) => state.movieFetchReducer)
    const dispatch = useDispatch()

    const getMovieInfo = useCallback(async (youtubeID: string, youtubeUrl :string) => {
        if(!userState.authenticated || !youtubeID || (youtubeUrl === "" )) return null
        const fetchURL: string = rootUrl + "/movie_fetch/"+youtubeID
        setLoading(true)

        try{
            const result = await Axios.get(fetchURL)
            setLoading(false)
            console.log({result})
            if(result.data.status === "success"){
                dispatch(fetchMovie(youtubeID, 
                    result.data.payload.title, 
                    result.data.payload.channelName, 
                    youtubeUrl, 
                    result.data.payload.tag, 
                    result.data.payload.state))
            }else{
                if(result.data.error_code === "021"){            
                    setError("限定公開動画は登録できません")
                }
                if(result.data.error_code === "011"){            
                    setError("動画の読み込みに失敗しました")
                }
            }
        }catch(error){
            setLoading(false)
            //const {status, statusText} = error.response
            //console.log(status, statusText)
            //setError(statusText)
        }
    }, [userState, dispatch])
    return [movieState, getMovieInfo, loading, error]
}

type APIStatus = 'initial' | 'waiting' | 'loading' | 'complete' | 'error'

export const SearchEffect = () => {
    const searchState = useSelector((state:any) => state.searchReducer)
    const dispatch = useDispatch()
    const status = searchState.searchStatus
    const query:string = searchState.query
    const and:boolean  = searchState.andSearch
    const page: number = searchState.page
    const sort = searchState.sort
    console.log(and)

    /*const queryObject = {
        q: query,                                                       
        t: "Tag",
        a: and,
        s: sort,
        p: String(page),                                                                           
    }*/        
    //console.log({queryObject})
    //const queryUrl:string = queryString.stringify(queryObject, {arrayFormat: 'comma'})
    useEffect(() => { 
        (async () => {
            if (status !== 'waiting') return
            dispatch(SearchStart())
            //history.push('/search?' + queryUrl)
            
            try{
                const searchResult = await Axios.get(rootUrl + "/search",
                    {
                        params:{
                            q: query,
                            a: and,
                            s: sort,
                            p: String(page),      
                    }})
                dispatch(SearchComplete(query, 
                                        sort,
                                        and,
                                        searchResult.data.payload.count,
                                        searchResult.data.payload.results))
                
            }catch(error){
                dispatch(SearchErrorAction(query, 
                                           sort,  
                                           error))
            }
        }
    )()}, [query, status, and, page, dispatch, sort])
    return null
}
