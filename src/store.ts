import {createStore} from 'redux'
import rootReducer from './Reducer/rootReducer'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import devToolsEnhancer, { composeWithDevTools } from 'remote-redux-devtools';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const composeEnhancers = composeWithDevTools({realtime: true, port:8000, secure:true})

const store = createStore(
    persistedReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    //composeEnhancers()
)

export const persistor = persistStore(store)
export default store