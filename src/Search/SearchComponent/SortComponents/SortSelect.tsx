import React, { useState }  from 'react';
import {Select, MenuItem, InputLabel, FormControl, makeStyles, FormControlLabel, Switch} from '@material-ui/core/'
import { useDispatch } from 'react-redux';
import {changeSearchRefine, changeSort} from '../../../Action/searchAction'
import {sortType} from '../../../Action/actionTypes'
import { useLocation } from 'react-router';
import { queryToAnd, queryToSort } from "../../../components/functions";

const useStyles = makeStyles(theme => ({
    select:{
        width: 135,
    },
}))

export const SortSelect = () => {
    const location = useLocation()
    let initialRefine: string = "true"
    let initialSort: string = "latest"
    const dispatch = useDispatch()

    if (location.search) {
        initialRefine  = queryToAnd(location.search)
        initialSort  = queryToSort(location.search)
    }
    /*
    useEffect(()=>{
        if(initialSort != searchState.sort){
            setSortCondition(initialSort)
            dispatch(changeSort(initialSort))
            setSearch(searchState.query, "Tag", true)
        }
    },[])*/
    const [sortCondition, setSortCondition] = useState<string>(initialSort)
    const [searchRefine, setSearchRefine] = useState<boolean>((initialRefine === "true"))
    
    const SelectChange = (event: React.ChangeEvent<{value: unknown}>) => {
        setSortCondition(event.target.value as sortType)
        dispatch(changeSort(event.target.value as sortType))
    }

    const toggleSearchRefine = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newState = !searchRefine
        setSearchRefine(newState)
        dispatch(changeSearchRefine(newState))
    }


    return(
        <>    
            <SortSelectField SelectChange={SelectChange} selectValue={sortCondition}/>
            <FormControlLabel
                control={<Switch checked={searchRefine} onChange={toggleSearchRefine} name="checkedA" />}
                label={(searchRefine) ? "and検索" : "or検索"}
            />
        </>
    )
}

interface SelectFieldProps{
    SelectChange: (event: React.ChangeEvent<{value: unknown}>) => void
    selectValue: string
}



export const SortSelectField :React.FC<SelectFieldProps> = ({SelectChange, selectValue}) => {
    const classes = useStyles()
    return(
        <>
            <FormControl className = {classes.select}> 
                <InputLabel>ソート</InputLabel>
                <Select onChange={SelectChange} value={selectValue}>
                    <MenuItem value={"latest"}>登録順</MenuItem>
                    <MenuItem value={"duration"}>動画時間</MenuItem>
                    <MenuItem value={"new_post"}>最新の動画</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

