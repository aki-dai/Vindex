import {signOut} from '../Action/userAction'
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

export const useErrorHandle = () => {
    const dispatch = useDispatch()
    const ErrorHandle = useCallback(async (res: any) => {
        switch(res.data.error_code){
            case "001"://access token expired
                break
            case "002":// refresh token expired
                dispatch(signOut())                    
                break
        }
    }, [])
    return[ErrorHandle]
}