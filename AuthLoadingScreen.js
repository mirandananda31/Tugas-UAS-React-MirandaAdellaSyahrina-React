import React, { Component } from 'react'
import { ActivityIndicator, View,StatusBar,AsyncStorage } from 'react-native'
 import firebase from "firebase";

export default class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
  
    this._checkState();

    // this._bootstrapAsync();
       
    }

    // _bootstrapAsync = async () => {
    //     const userToken = await AsyncStorage.getItem('userToken');

    //     // This will switch to the App screen or Auth screen and this loading
    //     // screen will be unmounted and thrown away.
    //     this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    // };


    _checkState =  () =>{
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('App')
            }else{
                this.props.navigation.navigate('Auth')
            }
        });

        // this.props.navigation.navigate(userToken ? 'App': 'Auth');
    };

    render(){
        return (
            <View>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
  }
  

