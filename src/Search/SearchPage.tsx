import React from 'react';
import { SearchBox } from '../components/SearchBox'
import { SearchConditions } from './SearchComponent/SearchConditions'
import { SearchResults } from './SearchComponent/SearchResults'
import { SearchEffect } from '../components/customHooks'

import queryString from 'query-string';

import Header from '../components/Header'
import { Container, Grid, Box } from '@material-ui/core';
import { useParams } from 'react-router';

export const Search: React.FC = () => {
    return(
        <>
            <SearchEffect />
            <SearchBox />
            <SearchConditions />
            <SearchResults />
        </>
    )
}