import { APIStatus, sortType, SearchIndex, SearchActionTypes } from '../Action/actionTypes'


export interface searchState{
    searchStatus: APIStatus
    query: string
    sort: sortType
    searchCount: number
    searchResult: SearchIndex[]
} 

const initialState:searchState = {
    searchStatus: 'initial',
    query: "",
    sort: 'latest',
    searchCount: 0,
    searchResult: [],
}

const searchReducer = (state = initialState, action:SearchActionTypes) => {
    switch(action.type) {
        case "SEARCH_ACTION_SUBMIT":{
            const { searchStatus } = state  
            if(searchStatus === ('waiting' || 'loading')) return state
            const {query, sort}= action.payload
            return{
                ...state,
                query: query,
                sort: sort,
                searchStatus: 'waiting'
            }
        }

        case "SEARCH_ACTION_START":{
            return{
                ...state,
                searchStatus: 'loading'
            }
        }

        case "SEARCH_ACTION_COMPLETE":{
            const {count, results} = action.payload
            return{
                ...state,
                searchStatus: 'complete',
                searchCount: count, 
                searchResult: results,
            } 
        }

        case "SEARCH_ACTION_ERROR":{
                return{
                    ...state,
                    searchStatus: 'error',
                }
            }

        default: {
            const _: never = action
            return state
        }
    }
}

export default searchReducer