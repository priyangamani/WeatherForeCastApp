import { GET_WEATHER_INFO, GET_WEATHER_INFO_SUCCESS, GET_WEATHER_INFO_FAILURE } from '../constants'

const initialState = {
  isFetching: false,
  error: false,
  data: {
    "lattitude": 0,
    "longitude": 0,
        "timezone": "",
        "offset": 0,
        "currently": {
            "time": 0,
            "summary": "",
            "icon": "",
            "precipIntensity": 0,
            "precipProbability": 0,
            "temperature": 0,
            "apparentTemperature": 0,
            "dewPoint": 0,
            "humidity": 0,
            "windSpeed": 0,
            "windBearing": 0,
            "cloudCover": 0,
            "pressure": 0,
            "ozone": 0
        },
    "hourly": {
        "summary": "",
        "icon": "",
        "data": [
            {
                "time": 0,
                "summary": "",
                "icon": "",
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 0,
                "apparentTemperature": 0,
                "dewPoint": 0,
                "humidity": 0,
                "windSpeed": 0,
                "windBearing": 0,
                "cloudCover": 0,
                "pressure": 0,
                "ozone": 0
            },
        ]
    },
    "daily": {
      "summary": "",
      "icon": "",
      "data": [
        {
          "time": 0,
          "summary": "",
          "icon": "",
          "sunriseTime":0,
          "sunsetTime": 0,
          "moonPhase": 0,
          "precipIntensity": 0,
          "precipIntensityMax": 0,
          "precipIntensityMaxTime":0,
          "precipProbability": 0,
          "precipType": "rain",
          "temperatureHigh":0,
          "temperatureHighTime":0,
          "temperatureLow": 0,
          "temperatureLowTime":0,
          "apparentTemperatureHigh":0,
          "apparentTemperatureHighTime":0,
          "apparentTemperatureLow":0,
          "apparentTemperatureLowTime":0,
          "dewPoint": 0,
          "humidity": 0,
          "pressure": 0,
          "windSpeed":0,
          "windGust": 0,
          "windGustTime": 0,
          "windBearing":0,
          "cloudCover": 0,
          "uvIndex": 0,
          "uvIndexTime": 0,
          "visibility": 0,
          "ozone": 0,
          "temperatureMin": 0,
          "temperatureMinTime":0,
          "temperatureMax": 0,
          "temperatureMaxTime":0,
          "apparentTemperatureMin":8,
          "apparentTemperatureMinTime":0,
          "apparentTemperatureMax":0,
          "apparentTemperatureMaxTime": 0
        },
      ]
    },
}
}


export default function dataReducer (state = initialState, action) {

  switch (action.type) {
    case GET_WEATHER_INFO:
      return {
        ...state,
        isFetching: true,
        error: false
      }
    case GET_WEATHER_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
        error: false
      }
    case GET_WEATHER_INFO_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
       
      }
    default:
      return state
  }
}
