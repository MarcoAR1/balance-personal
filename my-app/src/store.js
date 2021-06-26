import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { balanceReducer } from './reducers/balanceReducer'
import { userReducer } from './reducers/userReducer'
import { animationReducer } from './reducers/animationReducer'
import { viewReducer } from './reducers/viewReducer'
import { filterReducer } from './reducers/filterReducer'

const reducer = combineReducers({
  user: userReducer,
  balance: balanceReducer,
  animation: animationReducer,
  view: viewReducer,
  filter: filterReducer,
})

const store = createStore(reducer, composeWithDevTools())

export default store
