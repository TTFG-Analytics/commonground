import { applyMiddleware, createStore } from 'redux'

import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducer from './discussions/index'

const middleware = applyMiddleware(promise(), thunk, logger())

export default createStore(reducer, middleware)

//1) import middleware and use applyMiddleware(middleware-passed-in)
//2 export createStore(reducer, middleware) to export the store