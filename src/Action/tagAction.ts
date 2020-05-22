import {Tag, tagTypes, FETCH_MOVIE, LOAD_TAG, UPDATE_TAG, DELETE_TAG, ADD_TAG, TagActionTypes, LOAD_MOVIE_INFO} from './actionTypes'



export function fetchMovie(youtubeID:string, title: string, channelName: string, url: string, tags:Tag[], state: "registered" | "unregistered"): TagActionTypes{
    const isRegistered = (state === "registered")
    return {
        type        : FETCH_MOVIE,
        youtubeID   : youtubeID,
        title       : title,
        channelName : channelName,
        url         : url,
        tags        : tags,
        isRegistered: isRegistered,
    }
}

export function loadMovieInfo(youtubeID:string, channelName: string, title: string): TagActionTypes{
    return {
        type        : LOAD_MOVIE_INFO,
        youtubeID   : youtubeID,
        title       : title,       
        channel_name : channelName,
    }
}

export function loadTag(youtubeID:string, valueTags: Tag[], tagType: tagTypes): TagActionTypes{
    return {
        type        : LOAD_TAG,
        tagType     : tagType,
        loadTags    : valueTags,
        youtubeID   : youtubeID,
    }
}

export function addTag(valueTag: Tag, tagType: tagTypes): TagActionTypes{
    return {
        type    : ADD_TAG,
        newTag  : valueTag,
        tagType : tagType
    }
}

export function deleteTag(numDeleteTag: number, tagType: tagTypes): TagActionTypes{
    console.log({numDeleteTag}, tagType)
    return {
        type            : DELETE_TAG,
        numDeleteTag    : numDeleteTag,
        tagType         : tagType
    }
}

export function updateTag(newTags: Tag[], tagType: tagTypes): TagActionTypes{
    return {
        type    : UPDATE_TAG,
        newTags : newTags,
        tagType : tagType
    }
}