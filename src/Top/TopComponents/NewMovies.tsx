import React, { useEffect, useState } from 'react'
import {SearchContainer} from '../../components/SearchResults'
import { SearchEffect } from '../../components/customHooks'
import Axios from 'axios'
import { rootUrl } from '../../serverUrl'
import { ResultIndex, Tag } from '../../Action/actionTypes'
import { Typography } from '@material-ui/core'

export const NewMovies = () => {
    const [results, setResults] = useState<ResultIndex[]>([])
    useEffect(() => {        
        Axios.get(rootUrl+'/search/latest')
            .then(latestMovies => {
                if(latestMovies.data.status === "success"){
                    setResults(latestMovies.data.payload.results)
            }})
    }, [])
    console.log(results)
    return(
        <>
            <Typography variant={"h5"} >
                新着動画
            </Typography>
            <SearchContainer props={results} />
        </>
    )
}