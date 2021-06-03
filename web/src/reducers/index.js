import { combineReducers } from 'redux'
import ClassesReducer from './ClassesReducer'

export default combineReducers ({
  classe: ClassesReducer
})
