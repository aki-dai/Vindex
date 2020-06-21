import { APIStatus, sortType, ResultIndex, SearchActionTypes } from '../Action/actionTypes'


export interface searchState{
    searchStatus: APIStatus
    query: string
    sort: sortType
    andSearch:boolean
    searchCount: number
    searchResult: ResultIndex[]
    page: number
} 

export const initialState:searchState = {
    searchStatus: 'initial',
    query: "",
    page: 1,
    andSearch: true,
    sort: 'latest',
    searchCount: 0,
    searchResult: [],
}

const searchReducer = (state = initialState, action:SearchActionTypes) => {
    switch(action.type) {
        case "SEARCH_ACTION_SUBMIT":{
            const { searchStatus } = state  
            if(searchStatus === ('waiting' || 'loading')) return state
            const {query, sort, pagenation}= action.payload
            let page = state.page
            if(!pagenation) page = 1
            return{
                ...state,
                query: query,
                sort: sort,
                searchStatus: 'waiting',
                page: page
            }
        }

        case "SEARCH_ACTION_START":{
            return{
                ...state,
                searchStatus: 'loading',
                searchResult: [],
            }
        }

        case "SEARCH_ACTION_COMPLETE":{
            const {count, results} = action.payload
            results.map((result) => { //タグを、一致するよう並び替える
                return result.tags.sort((a,b) => {
                    if(typeof a.count == "number" && typeof b.count == "number" ){
                        return (a.count < b.count) ? 1 : -1
                    }else{
                        return 0
                    }
                })
            })
            return{
                ...state,
                query: action.payload.query,
                sort: action.payload.sort,
                searchStatus: 'complete',
                searchCount: count,
                andSearch: action.payload.and,
                searchResult: results,
            } 
        }

        case "SEARCH_ACTION_ERROR":{
                return{
                    ...state,
                    searchStatus: 'error',
                }
            }

        case "CHANGE_REFINE":{
            return{
                ...state,
                andSearch: action.andSearch
            }
        }

        case "CHANGE_PAGE":{
            return{
                ...state,
                page: action.page
            }
        }

        case "CHANGE_SORT":{
            return{
                ...state,
                sort: action.sort
            }
        }

        default: {
            return state
        }
    }
}

export default searchReducer
