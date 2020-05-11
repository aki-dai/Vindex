import { Tag, TagActionTypes } from '../Action/actionTypes'

export interface tagState{
    editor:{
        youtubeID   :string
        title       :string
        channelName :string
        url         :string
        tags        :Tag[]
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

const initialState:tagState = {
    editor:{
        youtubeID   :"",
        title       :"",
        channelName :"",
        url         :"",
        tags        :[]
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
                    tags        : []
                }
            }        
        }

        case 'LOAD_MOVIE_INFO':{
            return{
                ...state,
                movie:{
                    ...state.movie,
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
                        youtubeID: action.youtubeID,
                        tags     : action.loadTags,
                        updatedAt   : "",
                        createdAt   : "",
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
            if(action.tagType === "movie"){
                return{
                    ...state,
                    movie:{
                        tags: state.movie.tags.slice(0, action.numDeleteTag)
                                         .concat(state.movie.tags.slice(action.numDeleteTag + 1, state.movie.tags.length))
                    }
                }
            }
            
            if(action.tagType === "editor"){
                return{
                    ...state,
                    editor:{
                        tags: state.editor.tags.slice(0, action.numDeleteTag)
                                         .concat(state.editor.tags.slice(action.numDeleteTag + 1, state.editor.tags.length))
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
        }

        default: {return state}
    }
}



export default tagReducer