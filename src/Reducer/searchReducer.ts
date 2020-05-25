import { APIStatus, sortType, ResultIndex, SearchActionTypes } from '../Action/actionTypes'


export interface searchState{
    searchStatus: APIStatus
    query: string
    sort: sortType
    andSearch:boolean
    searchCount: number
    searchResult: ResultIndex[]
} 

const initialState:searchState = {
    searchStatus: 'initial',
    query: "",
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
            results.map((result) => {//タグを、一致するよう並び替える
                result.tags.sort((a,b) => {
                    if(typeof a.count == "number" && typeof b.count == "number" ){
                        return (a.count < b.count) ? 1 : -1
                    }else{
                        return 0
                    }
                })
            })
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

        case "CHANGE_REFINE":{
            return{
                ...state,
                andSearch: action.andSearch
            }
        }

        default: {
            const _: never = action
            return state
        }
    }
}

export default searchReducer
