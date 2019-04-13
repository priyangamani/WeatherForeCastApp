/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import HomeScreen from './src/components/HomeScreen';
import DetailScreen from './src/components/DetailScreen';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

const store = configureStore()
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <AppContainer />
    </Provider>  
    );
  }
}


 
const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: DetailScreen,
  },
});

const AppContainer = createAppContainer(AppNavigator);
