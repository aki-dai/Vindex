import authReducer, {initialState as authInitialState} from '../Reducer/authReducer'
import searchReducer, {initialState as searchInitialState} from '../Reducer/searchReducer'
import tagReducer, {initialState as tagInitialState} from '../Reducer/tagReducer'
import userReducer, {initialState as userInitialState, userState} from '../Reducer/userReducer'


import * as actionType   from '../Action/actionTypes'
import * as authAction   from '../Action/authAction'
import * as searchAction from '../Action/searchAction'
import * as tagAction    from '../Action/tagAction'
import * as userAction   from '../Action/userAction'

import { decodeJwt } from '../components/modules'

describe('authReducer works collectly',() => {
    it('init',() => {
        expect(authReducer(undefined, {type:'AUTH', url: ''})).toEqual(authInitialState)
    })
    it('setRedirectPath',() => {
        expect(authReducer(authInitialState, authAction.setRedirectUrl('/about'))).toMatchObject({redirectPath: '/about'})
    })
})

describe('searchReducer works collectly',() => {
    it('setSearchWord',() => {
        expect(searchReducer(searchInitialState, searchAction.SearchSubmit('VTuber', 'latest', true))).toMatchObject({
            query: 'VTuber',
            sort: 'latest',
            searchStatus: 'waiting'})
    })

    it('startSearch',() => {
        expect(searchReducer(searchInitialState, searchAction.SearchStart())).toMatchObject({
            searchStatus: 'loading'})
    })

    it('completeSearch',() => {
        expect(searchReducer(searchInitialState, searchAction.SearchComplete('VTuber', 'new_post', true, 0, []))).toMatchObject({
            query: 'VTuber',
            sort: 'new_post',
            searchStatus: 'complete',        
            searchCount: 0, 
            searchResult: [],
        })
        
        expect(searchReducer(searchInitialState, searchAction.SearchComplete('歌ってみた', 'latest', true, 0, []))).toMatchObject({
            query: '歌ってみた',
            sort: 'latest',
            searchStatus: 'complete',        
            searchCount: 0, 
            searchResult: [],
        })
    })    
    it('errorSearch',() => {
        expect(searchReducer(searchInitialState, searchAction.SearchErrorAction('VTuber', 'duration',"error"))).toMatchObject({
            searchStatus: 'error', 
        })
    })
    
    it('toggleSearchRefine',() => {
        expect(searchReducer(searchInitialState, searchAction.changeSearchRefine(false))).toMatchObject({
            andSearch: false
        })
        expect(searchReducer(searchInitialState, searchAction.changeSearchRefine(true))).toMatchObject({
            andSearch: true
        })
    })
    it('changePage',() => {
        expect(searchReducer(searchInitialState, searchAction.changePage(10))).toMatchObject({
            page: 10 
        })
    })     
})

describe('userReducer works collectly',() => {
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJwcm92aWRlciI6InR3aXR0ZXIiLCJ1aWQiOiIxMDE5ODgwNTUxOTk2NDgxNTM2IiwiZXhwIjoiMTU5MDE3NTU3MiJ9.ImFw6FAimfkJYnZFya_eHfqRDc0SSDH5cwvlja1gLvI'
    const refreshToken= 'eyJhbGciOiJIUzI1NiJ9.eyJwcm92aWRlciI6InR3aXR0ZXIiLCJ1aWQiOiIxMDE5ODgwNTUxOTk2NDgxNTM2IiwiZXhwIjoiMTU5MjgwMzI4NSJ9.J4yACnEyEM4kFi_bQtnazBhLuP8t9IQ7JWv3xOTc5gI'
    const userInfo = decodeJwt(accessToken)
    const userID = 'akidai'
    const provider = 'twitter'

    
    it('userAuthInit', ()=>{
        expect(userReducer(userInitialState, userAction.authUser(accessToken, refreshToken, userID, provider, userInfo.exp))).toMatchObject({          
            authenticated   : true,
            accessToken     : accessToken,
            refreshToken    : refreshToken,
            provider        : 'twitter', 
            userID          : 'akidai',
            accessExp       : '1590175572',
            status          : 'waiting'
        })
    })
    it('logOut', ()=>{
        const signInState: userState = {
            status: 'complete' as actionType.APIStatus,
            authenticated: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
            userID: 'akidai',
            userName: 'akidai16',
            nickName: 'akidai16',
            provider: 'twitter',
            image: "",
            accessExp: null,
            error: ""
        }
        expect(userReducer(signInState, userAction.signOut())).toMatchObject({
            initialState:{
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
        })
    })
})

describe('tagReducer works collectly',() => {
    const youtubeID = "LZVdK5kgSOk"
    const title = "【麻雀】#天鳳クリスマス杯【🎄🎅🎁】"
    const channelName = "楠栞桜 / Kusunoki Sio"
    const url = "https://www.youtube.com/watch?v=LZVdK5kgSOk" 
    const tags = [
        {
          value: 'VTuber',
          youtubeID: "LZVdK5kgSOk",
          count: 16
        },
        {
          value: '楠栞桜',
          youtubeID: "LZVdK5kgSOk",
          count: 9
        },
        {
          value: '麻雀',
          youtubeID: "LZVdK5kgSOk",
          count: 4
        },
        {
          value: '柾花音',
          youtubeID: "LZVdK5kgSOk",
          count: 2
        },
        {
          value: '天鳳',
          youtubeID: "LZVdK5kgSOk",
          count: 1
        }
    ]

    it('fetchMovie',() => {
        expect(tagReducer(tagInitialState, tagAction.fetchMovie(youtubeID, title, channelName, url, tags, "registered"))).toMatchObject({
            editor:{
                youtubeID : "LZVdK5kgSOk",
                title : "【麻雀】#天鳳クリスマス杯【🎄🎅🎁】",
                channelName : "楠栞桜 / Kusunoki Sio",
                url : "https://www.youtube.com/watch?v=LZVdK5kgSOk",
                tags : tags
            }
        })
    })

    it('loadMovieInfo',() => {
        expect(tagReducer(tagInitialState, tagAction.loadMovieInfo(youtubeID, channelName, title))).toMatchObject({
            editor:{
                youtubeID   :"",
                title       :"",
            },
            movie:{
                youtubeID   : youtubeID,
                title       : title,
                channelName : channelName,
            }})
        })


    it('loadTag',() => {
        expect(tagReducer(tagInitialState, tagAction.loadTag(youtubeID, tags, "movie"))).toMatchObject({
            editor:{
                youtubeID   :"",
                title       :"",
            },
            movie:{
                youtubeID: youtubeID,
                tags     : tags,
            }
        })
        expect(tagReducer(tagInitialState, tagAction.loadTag(youtubeID, tags, "editor"))).toMatchObject({
            editor:{
                youtubeID: youtubeID,
                tags     : tags,
            },
            movie:{
                youtubeID   :"",
                title       :"",
            },
        })
    })
    

    it('addTag',() => {
        expect(tagReducer(tagInitialState, tagAction.addTag(tags[2], "movie"))).toMatchObject({
            movie:{
                tags     : [tags[2]],
            }
        })
        expect(tagReducer(tagInitialState, tagAction.addTag(tags[3], "editor"))).toMatchObject({
            editor:{
                tags     : [tags[3]],
            }
        })
    })
/*
    it('deleteTag',() => {
        const addedTagsState = {
            ...tagInitialState,
            movie:{
                ...tagInitialState.movie,
                youtubeID : "LZVdK5kgSOk",
                title : "【麻雀】#天鳳クリスマス杯【🎄🎅🎁】",
                channelName : "楠栞桜 / Kusunoki Sio",
                tags: tags,
            },
            editor:{
                ...tagInitialState.editor,
                youtubeID : "LZVdK5kgSOk",
                title : "【麻雀】#天鳳クリスマス杯【🎄🎅🎁】",
                channelName : "楠栞桜 / Kusunoki Sio",
                tags: tags,
                url: url,
            }
        }
        expect(tagReducer(tagInitialState, tagAction.deleteTag(1, "movie"))).toMatchObject({
            editor:{
                tags : []
            },
            movie:{
                tags : [
                    {
                      value: 'VTuber',
                      youtubeID: "LZVdK5kgSOk",
                      count: 16
                    },
                    {
                      value: '麻雀',
                      youtubeID: "LZVdK5kgSOk",
                      count: 4
                    },
                    {
                      value: '柾花音',
                      youtubeID: "LZVdK5kgSOk",
                      count: 2
                    },
                    {
                      value: '天鳳',
                      youtubeID: "LZVdK5kgSOk",
                      count: 1
                    }
                ]
            }
        })
        expect(tagReducer(tagInitialState, tagAction.deleteTag(2, "editor"))).toMatchObject({
            movie:{
                tags : []
            },
            editor:{
                tags : [
                    {
                      value: 'VTuber',
                      youtubeID: "LZVdK5kgSOk",
                      count: 16
                    },
                    {
                      value: '楠栞桜',
                      youtubeID: "LZVdK5kgSOk",
                      count: 9
                    },
                    {
                      value: '柾花音',
                      youtubeID: "LZVdK5kgSOk",
                      count: 2
                    },
                    {
                      value: '天鳳',
                      youtubeID: "LZVdK5kgSOk",
                      count: 1
                    }
                ]
            }
        })
    })  
    it('updateTag',() => {
        expect(tagReducer(tagInitialState, tagAction.updateTag([], "movie"))).toMatchObject({
            editor:{
                youtubeID   :"",
                title       :"",
                channelName :"",
                url         :"",
                tags        :[],
                isRegistered:false,
            },
            movie:{
                youtubeID   : "",
                title       : "",
                channelName : "",
                updatedAt   : "",
                createdAt   : "",
                tags        : []
            }
        })
        expect(tagReducer(tagInitialState, tagAction.updateTag([], "editor"))).toMatchObject({ 
            editor:{
                youtubeID   :"",
                title       :"",
                channelName :"",
                url         :"",
                tags        :[],
                isRegistered:false,
            },
            movie:{
                youtubeID   : "",
                title       : "",
                channelName : "",
                updatedAt   : "",
                createdAt   : "",
                tags        : []
            }
        })
    })*/

})
