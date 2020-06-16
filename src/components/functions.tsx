import queryString from 'query-string'

export const queryToWord = (qs:string) => {
    const queryParsed = queryString.parse(qs, {arrayFormat: 'comma'})
    const queryWord = queryParsed.q as string[]
    if(!queryWord) return ""
    else if(typeof queryWord == "string") return queryWord
    else return queryWord.join(' ')
}

export const queryToScope = (qs:string) => {
    const queryParsed = queryString.parse(qs, {arrayFormat: 'comma'})
    const queryScope = queryParsed.t as string
    if(!queryScope) return "Tag"
    else return queryScope
}

export const queryToPage = (qs:string) => {
    const queryParsed = queryString.parse(qs, {arrayFormat: 'comma'})
    const queryPage = queryParsed.p as string
    if(!queryPage) return 1
    else return queryPage
}

export const queryToAnd = (qs:string) => {
    const queryParsed = queryString.parse(qs, {arrayFormat: 'comma'})
    const queryAndSearch = queryParsed.a as string
    if(!queryAndSearch) return "true"
    else return queryAndSearch
}

export const queryToSort = (qs:string) => {
    const queryParsed = queryString.parse(qs, {arrayFormat: 'comma'})
    const queryAndSearch = queryParsed.s as string
    if(!queryAndSearch) return "latest"
    else return queryAndSearch
}