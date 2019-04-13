import { combineReducers } from 'redux'
import getWeatherData from './weatherInfo'

const rootReducer = combineReducers({
    getWeatherData
})

export default rootReducer;
