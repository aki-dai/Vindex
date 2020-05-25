import React, { useState }  from 'react';
import {Select, MenuItem, TextField, InputLabel, FormControl, Input, Button, makeStyles, FormControlLabel, Switch} from '@material-ui/core/'
import { useDispatch, useSelector } from 'react-redux';
import {changeSearchRefine} from '../../../Action/searchAction'

const useStyles = makeStyles(theme => ({
    select:{
        width: 135,
    },
}))

export const SortSelect = () => {
    const [sortCondition, setSortCondition] = useState<string>("latest")
    const [searchWord, setSearchWord] = useState<boolean>(true)
    const [searchRefine, setSearchRefine] = useState<boolean>(true)
    //const searchState = useSelector((state :any) => state.searchReducer)    
    const dispatch = useDispatch()
    
    const SelectChange = (event: React.ChangeEvent<{value: unknown}>) => {
        setSortCondition(event.target.value as string)
    }

    const toggleSearchRefine = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchRefine(event.target.checked)
        dispatch(changeSearchRefine(searchRefine))
    }


    return(
        <>    
            <SortSelectField SelectChange={SelectChange} selectValue={sortCondition}/>
            <FormControlLabel
                control={<Switch checked={searchRefine} onChange={toggleSearchRefine} name="checkedA" />}
                label="Custom color"
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
            <FormControl className = {classes.select} disabled> 
                <InputLabel>ソート</InputLabel>
                <Select onChange={SelectChange} value={selectValue}>
                    <MenuItem value={"latest"}>新着順</MenuItem>
                    <MenuItem value={"duration"}>動画時間</MenuItem>
                    <MenuItem value={"oldest"}>古い順</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}

