import React, { useState }  from 'react';
import {Select, MenuItem, TextField, InputLabel, FormControl, Input, Button, makeStyles} from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
    select:{
        width: 135,
    },
}))

export const SortSelect = () => {
    const [sortCondition, setSortCondition] = useState<string>("latest")
    const [searchWord, setSearchWord] = useState<boolean>(true)

    const SelectChange = (event: React.ChangeEvent<{value: unknown}>) => {
        setSortCondition(event.target.value as string)
    }


    return(
        <>    
            <SortSelectField SelectChange={SelectChange} selectValue={sortCondition}/>
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

