import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAvoidingView,Text,TextInput,Alert,Image, Button, View,StyleSheet,Header } from 'react-native'
import MenuButton from '../components/MenuButton';
import firebase from "firebase";
import Spinner from './Spinner';

export default class ProfileScreen  extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       name:null,
       email:null,
       photoUrl:null
    }
  }
  
  componentDidMount = () => {
    this._getCurrentUser();
  };

  _getCurrentUser = async()=>{
    let user = await firebase.auth().currentUser;
    console.log(user) ;
    if (user !=null) {
      this.setState({
        name: user.displayName, 
        email: user.email, 
        photoURL: user.photoURL
      })
    }
  }

  _updateProfile=()=>{
    var user = firebase.auth().currentUser;
    var credential;

    user.updateProfile({
      displayName: this.state.name,
      photoURL : 'https://randomuser.me/api/portraits/men/44.jpg',
    }).then(function () {
      Alert.alert('Succes','Update data successfull')
      
    }).catch(function (error) {
      Alert.alert('error,','error happened')
      
    });

    user.updateEmail(this.state.email).then( (user) => {
      Alert.alert('Success','Email update')
  }).catch(function (error) {
      Alert.alert('Error', 'Error happened')
  });

  }

  _renderButtonOrSpinner=()=>{
    if (this.state.loading) {
      return <Spinner />;
      
    }
    return <Button style={{marginTop: 30, width:'90%'}} onPress={this._updateProfile} title="update" />;
  }
  
    static navigationOptions  ={
       
        title :'Home',
    };
    render() {
      return (
          <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} behavior="padding" enabled>
              <MenuButton navigation ={this.props.navigation}/>

              <Image source={{uri:this.state.photoURL}} style={{width:200,height:200}} />

                        
               <TextInput style={{ width: '90%',borderRadius: 5,borderColor: '#ccc', borderBottomWidth: 1 }} value={this.state.name} onChangeText={(text)=>{this.setState({name: text})}} placeholder="Name" />
              

              <TextInput style={{ width: '90%',borderRadius: 5,borderColor: '#ccc', borderBottomWidth: 1 }} value={this.state.email} onChangeText={(text)=>{this.setState({email: text})}} placeholder="Email" />
              
              {this._renderButtonOrSpinner()}
              <View style={styles.button}>
                  <Button
                      color="gray"
                      style={{width:'90%'}}
                      onPress={this._signOutAsync}
                      title="Log out">
                  </Button>
              </View>
              
          </KeyboardAvoidingView>
      );
  }

  _showMoreApp = () => {
      this.props.navigation.navigate('Other');
  };

  _signOutAsync= () => {
      firebase.auth().signOut().then(function () {
          this.props.navigation.navigate('Auth');
      }).catch(function (error) {
          console.log(error)
      });
  };
}
const styles=StyleSheet.create({

  container:{
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  button:{
    borderRadius:10,
    width: '90%',
    marginTop:20
  }
 

})
