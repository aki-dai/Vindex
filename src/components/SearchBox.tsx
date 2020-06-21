import React, { useState, useEffect } from 'react';
import {Select, MenuItem, InputLabel, FormControl, Input, Button, makeStyles} from '@material-ui/core/'
import { useLocation } from 'react-router';
import { queryToWord, queryToScope} from './functions' 
import { useSearch } from './customHooks'

const useStyles = makeStyles(theme => ({
    textBox:{
        display: "inline-block",
        marginTop: 15,
        marginLeft: 5,
    },
    scope:{
        width: 135,
    },
}))


export const SearchBox = () => {
    const location = useLocation()
    const setSearch = useSearch()
    let initialWord  :string = ""
    let initialScope :string = "Tag"
    if (location.search) {
        initialWord  = queryToWord(location.search)
        initialScope = queryToScope(location.search)
    }

    const [searchScope, setSearchScope] = useState<string>(initialScope)
    const [searchWord, setSearchWord] = useState<string>(initialWord)

    useEffect(() => {//画面遷移したときにquery parameterを反映する
        setSearchWord(initialWord)
    }, [location.search, initialWord])

    const SelectChange = (event: React.ChangeEvent<{value: unknown}>) => {
        setSearchScope(event.target.value as string)
    }

    const TextFieldChange = (event: React.ChangeEvent<{value: string}>) => {
        setSearchWord(event.target.value)
    }
    

    return(
        <>    
            <SelectField SelectChange={SelectChange} selectValue={searchScope}/>
            <InputField TextFieldChange={TextFieldChange} textValue={searchWord} />
            <SearchButton onClick={() => setSearch(searchWord, searchScope, 1)}/>
        </>
    )
}

interface InputFieldProps{
    TextFieldChange: (event: React.ChangeEvent<{value: string}>) => void
    textValue    : string
}

const SelectField:React.FC<SelectFieldProps> = ({SelectChange, selectValue}) => {
    const classes = useStyles()
    return(
        <>    
            <FormControl className = {classes.scope} disabled>
                <InputLabel>検索対象</InputLabel>
                <Select onChange={SelectChange} value={selectValue}>
                    <MenuItem value={"Tag"} >タグ</MenuItem>
                    <MenuItem value={"Title"}>タイトル</MenuItem>
                </Select>
            </FormControl>
        </>
    )
}


interface SelectFieldProps{
    SelectChange: (event: React.ChangeEvent<{value: unknown}>) => void
    selectValue: string
}

const InputField:React.FC<InputFieldProps> = ({TextFieldChange, textValue}) => {
    const classes = useStyles()
    return(
        <>
            <div className={classes.textBox}>
                <Input onChange={TextFieldChange} value={textValue} id="Search-TextField" />
            </div>
        </>
    )
}

const SearchButton:React.FC<{onClick:()=>void}> = ({onClick}) => {
    return(
        <>
            <Button onClick={onClick} id="Search-Button">
                検索
            </Button>
        </>
    )
}
