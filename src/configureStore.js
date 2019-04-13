import { createStore, applyMiddleware } from 'redux'
import app from './reducers'
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import dataSaga from './saga'

let store;
const sagaMiddleware = createSagaMiddleware()

export default function configureStore() {
  /* global __DEV__ */
if (__DEV__) {
  store = createStore(app, applyMiddleware(sagaMiddleware,logger))
}else{
 store = createStore(app, applyMiddleware(sagaMiddleware))
}
  sagaMiddleware.run(dataSaga)
  return store
}