import authReducer, {initialState} from '../Reducer/authReducer'
import * as actionType from '../Action/actionTypes'

describe('authReducer works collectly',() => {
    it('init',() => {
        expect(authReducer(undefined, {type:'AUTH', url: ''})).toEqual(initialState)
    })
    it('setRedirectPath',() => {
        expect(authReducer(initialState, {type:'AUTH', url: '/about'})).toMatchObject({redirectPath: '/about'})
    })
})
  
