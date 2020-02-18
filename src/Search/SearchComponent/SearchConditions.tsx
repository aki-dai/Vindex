import React from 'react';
import { Typography, Container } from '@material-ui/core';
import {SortSelect} from './SortComponents/SortSelect'
import {queryToWord} from '../../components/functions'
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';



export const SearchConditions = () => {
    const location = useLocation()
    let searchWord = ""
    if (location.search) searchWord = queryToWord(location.search)
    const searchCount = useSelector((state:any) => state.searchReducer.searchCount)
    return(
        <>
            <Container>
                <Typography>
                {searchWord} での検索結果
                </Typography>
                <Typography>
                    {searchCount}件の動画
                </Typography>
                
                <SortSelect />
            </Container>        
        </>
    )
}