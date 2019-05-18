import  React from "react";
import  {Platform,Dimensions} from 'react-native';
import  {createDrawerNavigator,createAppContainer, createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import ProfileScreen from '../pages/ProfileScreen';
import ContactScreen from '../pages/ContactScreen';
import InfoScreen from '../pages/InfoScreen';
import TodoScreen from '../pages/TodoScreen';
import MapScreen from '../pages/MapScreen';
import MenuDrawer from "../components/MenuDrawer";

const WIDTH =  Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH*0.83,
    contentComponent:({ navigation })=>{
        return( <MenuDrawer navigation={navigation}/> )
    }
}
 const Tabs = createBottomTabNavigator({
     Home: ProfileScreen,
     Info:InfoScreen,
     Contact:ContactScreen,
 },{
     tabBarOptions:{
         activeTintColor:'#000',
         inactiveTintColor:'gray',
         style:{
             backgroundColor:'#fff',
         },
         indicatorStyle:{
             backgroundColor:'#000'
         },
     }
 });
 
const DrawerNavigator = createDrawerNavigator(
    {
        Profile: {
            screen :Tabs
        },
        Todo: {
            screen: TodoScreen
        },
        Map:{
            screen: MapScreen
        },
    },
    DrawerConfig
);
 const StackNavigator = createStackNavigator({
     DrawerNavigator:{
         screen:DrawerNavigator,
         navigationOptions:{
             header:null,
         }
     }
 });

// const StackNavigator = createStackNavigator


export default createAppContainer(StackNavigator);

