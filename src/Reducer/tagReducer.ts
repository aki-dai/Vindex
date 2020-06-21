import { Tag, TagActionTypes } from '../Action/actionTypes'

export interface tagState{
    editor:{
        youtubeID   :string
        title       :string
        channelName :string
        url         :string
        tags        :Tag[]
        isRegistered:boolean
    }
    movie:{
        youtubeID :string
        title       :string
        channelName :string
        updatedAt :string
        createdAt :string
        tags      :Tag[]
    }
} 

export const initialState:tagState = {
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
}

const tagReducer = (state = initialState, action:TagActionTypes) => {
    switch(action.type) {
        case "FETCH_MOVIE":{
            return{
                ...state,
                editor:{
                    youtubeID   : action.youtubeID,
                    title       : action.title,
                    channelName : action.channelName,
                    url         : action.url,
                    tags        : action.tags,
                    isRegistered: action.isRegistered,
                }
            }        
        }

        case 'LOAD_MOVIE_INFO':{
            return{
                ...state,
                movie:{
                    ...state.movie,
                    youtubeID   : action.youtubeID,
                    title       : action.title,
                    channelName : action.channel_name,
                }
            }
        }

        case "LOAD_TAG":{
            if(action.tagType === "movie"){
                return{
                    ...state,
                    movie:{
                        ...state.movie,
                        youtubeID: action.youtubeID,
                        tags     : action.loadTags,
                    }
                }
            }
            if(action.tagType === "editor"){
                return{
                    ...state,
                    editor:{
                        ...state.editor,
                        youtubeID: action.youtubeID,
                        tags     : action.loadTags,
                    }
                }
            }
            break
        }

        case "ADD_TAG":{
            if(action.tagType === "movie"){
                state.movie.tags.push(action.newTag) 
                return{
                    ...state,
                }
            }
            if(action.tagType === "editor"){
                state.editor.tags.push(action.newTag) 
                return{
                    ...state,
                }
            }
            break  
        }

        case "DELETE_TAG":{
            const return_tags:Tag[] = []
            const change_tag = (action.tagType === "movie") ? state.movie.tags : state.editor.tags
            for(let i = 0; i < change_tag.length; i++){
                if(i !== action.numDeleteTag){
                    return_tags.push(change_tag[i])
                }
            }
            console.log({change_tag})
            if(action.tagType === "movie"){
                return{
                    ...state,
                    movie:{
                        ...state.movie,
                        tags: return_tags
                    }
                }
            }
            
            if(action.tagType === "editor"){
                return{
                    ...state,
                    editor:{
                        ...state.editor,
                        tags: return_tags
                    }
                }
            }
            break
        }

        case "UPDATE_TAG":{
            if(action.tagType === "movie"){
                return{
                    ...state
                }
            }
            
            if(action.tagType === "editor"){
                return{
                    ...state    
                }
            }
            break
        }

        default: {return state}
    }
}



export default tagReducer