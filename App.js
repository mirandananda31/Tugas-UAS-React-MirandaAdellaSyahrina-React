import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DrawerNavigator from './Navigation/DrawerNavigator';
import firebase from "firebase";
import AuthLoadingScreen from './pages/AuthLoadingScreen';
import LoginScreen from './pages/LoginPages';

import {createSwitchNavigator, createStackNavigator,createAppContainer  } from "react-navigation";

const AppStack = createSwitchNavigator({DrawerNavigator});
const AuthStack = createStackNavigator({Login: LoginScreen},{ headerMode :'none'});

const AppContainer =  createAppContainer(createStackNavigator(
  {
    AuthLoading : AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default class App extends React.Component {

  componentWillMount () {
    firebase.initializeApp({
     apiKey: "AIzaSyBVCgknj57JCIGme5EBiuMSI6sHjmlt5RM",
    authDomain: "reactuas-1234.firebaseapp.com",
    databaseURL: "https://reactuas-1234.firebaseio.com",
    projectId: "reactuas-1234",
    storageBucket: "reactuas-1234.appspot.com",
    messagingSenderId: "923988518430",
    appId: "1:923988518430:web:2ce48880051fdfa7"
    });
  }

  render() {
    return (

      <AppContainer/>
     
    );
  }
}