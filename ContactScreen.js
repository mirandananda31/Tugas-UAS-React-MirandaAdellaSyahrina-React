import React, { Component } from 'react'
import { 
    KeyboardAvoidingView,
    TextInput,
    View,
    Button,
    FlatList,
    Text
      } from 'react-native'
import MenuButton from '../components/MenuButton';
import { SQLite } from "expo";
const db= SQLite.openDatabase('db.db');

export default class ContactScreen extends Component {
    static navigationOptions = {
        title:'Contact'
    }
    constructor(props) {
        super(props)
        this.state = {
            title:'',
            todos:[]     
        }
    }

    componentDidMount() {
        db.transaction(
            tx => {
                tx.executeSql(
                    'create table todos (id integer primary key not null,title text,complete int)'
                )
            });
            this._getData()
    }
    
    
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" enabled>
                <View>
                    <MenuButton navigation ={this.props.navigation}/>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 70,marginLeft:10 }}>
                    <TextInput
                        placeholder="TodoSQLite"
                        value={this.state.title}
                        onChangeText={(text) => this.setState({ title: text })}
                        style={{ width: '80%', padding: 5, borderRadius: 5, borderColor: '#ccc', borderBottomWidth: 1, }}
                    />
                    <Button
                        title="Add"
                        disabled={!this.state.title.length}
                        onPress={this._addData} />
                </View>
                <FlatList
                    data={this.state.todos}
                    renderItem={({item}) => <Text >{item.title} </Text> }
                    keyExtractor={(item, index) => item.id.toString()}
                >
                    
                </FlatList>
            </KeyboardAvoidingView>
        )
    }

    _addData = ()=>{
        let title = this.state.title;
        db.transaction(tx=>{
            tx.executeSql('insert into todos (complete,title) values (0,?)',[title])
        },
        null,
        this.setState({title:''})
        );
        this._getData()
    }

    _getData=()=>{
        db.transaction(tx=>{
            tx.executeSql('select* from todos',[],(_,{rows})=>
                // console.log(rows._array)
                this.setState({ todos: rows._array })
            );
        })
    }
}