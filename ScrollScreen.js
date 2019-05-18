import React from 'react';
import {ScrollView ,Text,View,StyleSheet}  from "react-native";
import _ from 'lodash';
import MenuButton from '../components/MenuButton';

export default class ScrollScreen extends React.Component{
 
render() {

  
    return (
        <ScrollView>
         
         
        <View style={styles.container}>
          <MenuButton navigation ={this.props.navigation}/>
        <Text style={styles.text}>scroll
        </Text>
      </View>
            
          
        </ScrollView>

    )
};
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text:{
        fontSize:30,
    }
  });