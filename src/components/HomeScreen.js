import React, {Component} from 'react';
import { TouchableHighlight, View, Text, StyleSheet,ScrollView,
  Image,Button,ImageBackground,ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import { fetchWeatherInfo } from '../actions'
import { Card, ListItem} from 'react-native-elements'
import PropTypes from 'prop-types';
import moment from "moment";
import { Grid,LineChart,YAxis} from 'react-native-svg-charts'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; 


const images = {
  backgroundImg: require('images/backgroundImg.jpg'),
  cloudy: require('images/cloudy.png'),
  partialcloud: require('images/partialcloud.png'),
  rain: require('images/rain.png'),
};


 class Home extends Component {
  constructor() {
    super();
  }

  componentDidMount(){
    this.props.fetchWeatherInfo();
  }

  renderCurrentWeatherComponent=()=>{
    const {getWeatherList} = this.props;
    return(
   <Card>
      <View >
        <Text style={styles.text}>
        {getWeatherList.currently.icon == "cloudy"? <Image source={images.partialcloud} style={styles.ratingImage}/>:
          <Image source={images.rain} style={styles.imageColor}/>}
          Current Weather Forecast
        </Text>
       </View> 
    <Text>
       Humidity:   {getWeatherList.currently.humidity}
    </Text>
    <Text>
       Time: {moment(getWeatherList.currently.time).format('LT')}
    </Text>
    <Text>
       Summary: {getWeatherList.currently.summary}
    </Text>
    <Text>
       Temperature: {getWeatherList.currently.temperature}
    </Text>
    <Text>
       Pressure: {getWeatherList.currently.pressure}
    </Text>
    <Text>
       WindSpeed: {getWeatherList.currently.windSpeed}
    </Text>
    <Text>
      PrecipIntensity: {getWeatherList.currently.precipIntensity} mm
    </Text>
    <Text>
      DewPoint : {getWeatherList.currently.dewPoint}
    </Text>
  </Card>
    )
    
  }
  

  composeChartData = () => {
    if(typeof this.props.getWeatherList !== 'undefined') {
        let weatherResults = this.props.getWeatherList;
        let hourlyData = weatherResults.hourly.data;
        return hourlyData.map(({time, temperature}) => (temperature))
    }
};

renderChartComponent = () =>{
  let composedValues = this.composeChartData();
  console.log(composedValues);
  const contentInset = { top: 20, bottom: 20 }

  return(
    <Card>
    <Text style={styles.text}>Hourly Weather Forecast</Text>
    <View style={{ height: 200, flexDirection: 'row' }}>
              <YAxis
                  data={ composedValues }
                  contentInset={ contentInset }
                  svg={{
                      fill: 'grey',
                      fontSize: 15,
                  }}
                  numberOfTicks={ 10 }
                  formatLabel={ value => `${value}ºC` }
              />
              <LineChart
                  style={{ flex: 1, marginLeft: 16 }}
               data={ composedValues }
                  svg={{ stroke: 'rgb(134, 65, 244)' }}
                  contentInset={ contentInset }
              >
                  <Grid/>
              </LineChart>
          </View>
          <Button
          title="Go to Details"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Details' })
              ],
            }))
          }}
        />
    </Card>

  )
}

static navigationOptions = {
  header: null
};


  render(){
    const {getWeatherList,isFetching,error} = this.props;
   return (
    <ImageBackground source={images.backgroundImg} style={styles.backgroundImage}>
    <ScrollView>
      <View style={styles.container}>
      {isFetching ? <ActivityIndicator size="small" color="#00f" /> : 
      <View>
      <Text style={styles.text}>{getWeatherList.timezone}</Text>
      {this.renderCurrentWeatherComponent()}
      {this.renderChartComponent()}
      <Card >
      <Text style={styles.text}>Daily Weather Forecast</Text>
    {
      getWeatherList.daily.data.map((item, i) => {
        return (
          <ListItem
            key={i}
            title={item.summary}
            subtitle={
          <View style={styles.subtitleView}>
            {item.icon == "cloudy"? <Image source={images.partialcloud} style={styles.imageColor}/>:
            <Image source={images.rain} style={styles.imageColor}/>}
            <Text style={styles.ratingText}>{moment(item.time).format('LT')}</Text>
          </View>
        }
          />
        );
      })
    }
  </Card>
  </View>
    }
    </View>
    </ScrollView>
    </ImageBackground>
  )
  
  
}
 
    }

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize:20,
  },
  button: {
    height: 60,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b7eff'
  },
  buttonText: {
    color: 'white'
  },
  mainContent: {
    margin: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5
  },
  imageColor: {
    height: 19.21,
    width: 20
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey'
  },
  row: {
    flexDirection: 'row',
  },
  colLeft: {
    flex: 1,
    marginRight:10,
  },
  colRight: {
    flex: 1,
    marginLeft:10,
    fontSize:40
  },
})

Home.propTypes = {
  getWeatherList: PropTypes.array.isRequired,
};


const mapStateToProps = state => {
  return {
    isFetching:state.getWeatherData.isFetching,
    getWeatherList:state.getWeatherData.data,
    error:state.getWeatherData.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWeatherInfo: () => dispatch(fetchWeatherInfo())
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)