import { GET_WEATHER_INFO, GET_WEATHER_INFO_SUCCESS, GET_WEATHER_INFO_FAILURE } from './constants'
import { takeLatest, call, put,takeEvery} from 'redux-saga/effects'
import * as api from './api';

function* fetchWeatherInfo () {
  try {
    const response = yield call(api.weatherApi);
    const data = response.data;


    console.log(data);
    yield put({ type: GET_WEATHER_INFO_SUCCESS, data})
  } catch (error) {
    yield put({ type: GET_WEATHER_INFO_FAILURE,error})
  }
}

function* dataSaga () {
  yield takeEvery(GET_WEATHER_INFO, fetchWeatherInfo)
}

export default dataSaga
