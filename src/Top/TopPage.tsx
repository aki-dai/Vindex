import React from 'react';
import { Caption } from './TopComponents/Caption'
import { SearchBox } from '../components/SearchBox'
import Header from '../components/Header'
import { Container, Grid, Box } from '@material-ui/core';

export const Top = () => {
    return(
        <>
            
            <Caption />
            <SearchBox />
        </>
    )
}
