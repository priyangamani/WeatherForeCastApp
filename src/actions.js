import { GET_WEATHER_INFO,GET_WEATHER_INFO_SUCCESS,GET_WEATHER_INFO_FAIL} from './constants'

export function fetchWeatherInfo() {
  return {
    type: GET_WEATHER_INFO
  }
}

export const fetchWeatherInfoSuccess = data => ({
  type: GET_WEATHER_INFO_SUCCESS,
  data,
});

export const fetchWeatherInfoFail = error => ({
  type: GET_WEATHER_INFO_FAIL,
  error,
});
