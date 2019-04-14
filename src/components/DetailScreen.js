import React, {Component} from 'react';
import { View, Text, StyleSheet,ScrollView,
  Image} from 'react-native'
import { connect } from 'react-redux'
import { fetchWeatherInfo } from '../actions'
import { Card, ListItem} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";
import { StackActions, NavigationActions } from 'react-navigation'; 


const images = {
  cloudy: require('images/cloudy.png'),
  partialcloud: require('images/partialcloud.png'),
  rain: require('images/rain.png'),
};

class DetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Hourly Weather Forecast',
      headerLeft: (
        <Icon
        name="arrow-left"
        size={25}
        marginLeft={20}
        backgroundColor="#3b5998"
        onPress={() => {
              navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'Home' })
                ],
              }))
            }}
      >
      </Icon>
      ),
    };
  };
    render() {
        const {getWeatherList} = this.props;
        return (
        <ScrollView>
        <Card >
      {
        getWeatherList.hourly.data.map((item, i) => {
          return (
            <ListItem
              key={i}
              title={item.summary}
              subtitle={
                <View style={styles.subtitleView}>
                  {item.icon == "cloudy"? <Image source={images.partialcloud} style={styles.imageColor}/>:
                  <Image source={images.rain} style={styles.imageColor}/>}
                  <Text style={styles.titleText}>{moment(item.time).format('LT')}</Text>
                  <Text style={styles.titleText}>DewPoint: {item.dewPoint}</Text>
                  <Text style={styles.titleText}>Humidity: {item.humidity}</Text>
                </View>
          }
            />
          );
        })
      }
       </Card>
      </ScrollView>
      );
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
    titleText: {
      paddingLeft: 10,
      color: 'grey'
    },
  })
  

  const mapStateToProps = state => {
    return {
      getWeatherList:state.getWeatherData.data,
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
  )(DetailScreen)

