import {AuthAction} from '../Action/actionTypes'

export interface AuthState{
    redirectPath: string
} 

export const initialState: AuthState = {
    redirectPath: ''
}

const authReducer = (state = initialState, action:AuthAction) => {
    switch(action.type) {
        case "AUTH":{
            return{     
                ...state,
                redirectPath: action.url
            }
        }

        default: {
            return state
        }
    }
}

export default authReducer
