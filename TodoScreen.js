import React, { Component } from 'react'
import MenuButton from '../components/MenuButton';
import { KeyboardAvoidingView,TextInput,Text, View, Button, ActivityIndicator, StatusBar, FlatList} from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'

export default class TodoScreen  extends Component {
    // static navigationOptions={
    //   title:'Todos'
    // }
 
    constructor(props){
      console.disableYellowBox=true;
      super(props)
      this.ref = firebase.firestore().collection('todos');
      this.unsubscribe=null;
      this.state={
        title:'',
        todos:[],
        loading:true
      };
    };

    componentDidMount(){
        this.unsubscribe=this.ref.onSnapshot(this.onCollectionUpdate);
    }

    componentWillUnmount = () => {
        this.unsubscribe();
    };
    
    onCollectionUpdate=(querySnapshot)=>{
        const todos=[];
        querySnapshot.forEach((doc)=>{
          const {title, complete}=doc.data();
          todos.push({
            key:doc.id,
            doc,
            title,
            complete
          })
        });
        this.setState({
          todos,
          loading:false
        })
    }

    _addTodo=()=>{
        this.ref.add({
          title:this.state.title,
          completed:false
        });

        this.setState({title:''})
    }
    // _signOutAsync = async() => {
    //     await AsyncStorage.clear();
    //     this.props.navigation.navigate('Auth');
    // };
  render() {
    if(this.state.loading){
      return(
        <View>
          <ActivityIndicator></ActivityIndicator>
          <StatusBar barStyle="default"></StatusBar>
        </View>
      )
    }
    return (
      <KeyboardAvoidingView>
        <View>
          <MenuButton navigation ={this.props.navigation}/>
        </View>
        <View style={{flexDirection:'row', marginTop:70,marginLeft:10}}>
          <TextInput
            placeholder="Your todos"
            value={this.state.todo}
            onChangeText={(text)=>this.setState({title:text})}
            style={{width: '80%',padding:5,borderRadius:5,borderBottomWidth:1,borderColor: '#000',}}/>
          <Button
          title="Add"
          disabled={!this.state.title.length}
          onPress={this._addTodo}
           />
        </View>
        <FlatList 
          data={this.state.todos}
          renderItem={({item})=>
            <Text>{item.title}</Text>}
            style={{marginLeft:10}}>
        </FlatList>
      </KeyboardAvoidingView>
    )
  }
}
