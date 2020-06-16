import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { ResultIndex, Tag } from '../../Action/actionTypes'
import { SearchContainer } from '../../components/SearchResults'

export const SearchWrapper = () => {
    const searchIndex:ResultIndex[] = useSelector((state:any) => state.searchReducer.searchResult)
    const count:number = useSelector((state:any) => state.searchReducer.searchCount)
    const page:number = useSelector((state:any) => state.searchReducer.page)
    return(
        <>
            <SearchContainer props={searchIndex} count={count} page={page} />
        </>
    )
}