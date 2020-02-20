import React, { useState, useEffect } from 'react';
import {Select, MenuItem, TextField, InputLabel, FormControl, Input, Button} from '@material-ui/core/'
import { textAlign } from '@material-ui/system';
import { useHistory, useLocation } from 'react-router';
import { queryToWord, queryToScope } from './functions' 
import { useSearch } from './customHooks'

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
    }, [location.search])

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
            <SearchButton onClick={() => setSearch(searchWord, searchScope)}/>
        </>
    )
}

interface InputFieldProps{
    TextFieldChange: (event: React.ChangeEvent<{value: string}>) => void
    textValue    : string
}

const SelectField:React.FC<SelectFieldProps> = ({SelectChange, selectValue}) => {
    return(
        <>    
            <FormControl>
                <InputLabel>検索対象</InputLabel>
                <Select onChange={SelectChange} value={selectValue}>
                    <MenuItem value={"Tag"} >タグ</MenuItem>
                    <MenuItem value={"Title"}>タイトル</MenuItem>
                    <MenuItem value={"Channel"}>チャンネル</MenuItem>
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
    return(
        <>    
            <Input onChange={TextFieldChange} value={textValue} id="Search-TextField" />
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
