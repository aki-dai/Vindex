import {SearchActionTypes, SearchIndex, sortType} from './actionTypes'
import { queryToScope } from '../components/functions';

export function SearchSubmit(q: string, sort: sortType): SearchActionTypes{
    return {
        type:'SEARCH_ACTION_SUBMIT',
        payload:{
            query: q,
            sort: sort
        }
    }
}

export function SearchStart(): SearchActionTypes{
    return {
        type:'SEARCH_ACTION_START',
    }
}

export function SearchComplete(q: string, sort: sortType, count:number, results:SearchIndex[]): SearchActionTypes{
    return {
        type:'SEARCH_ACTION_COMPLETE',
        payload:{
            query: q,
            count: count,
            sort: sort,
            results: results
        }
    }
}
 
export function SearchErrorAction(q:string, sort: sortType, error:string) {
    return{
        type: 'SEARCH_ERROR',
        query: q,
        sort: sort,
        error: error,
    } 
}