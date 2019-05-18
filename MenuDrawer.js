import React from 'react';

import{Platform,
    Image,Dimensions,
    StyleSheet,View,
    Text,TouchableOpacity
    ,ScrollView} from 'react-native';
import {ImagePicker, Permissions} from 'expo';

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

export default class MenuDrawer extends React.Component{
constructor (props){
    super(props)
    this.state = {
        image :'http://bit.ly/gbr-pisang',
        hasCameraPermission: null,
        hasCameraRollPermission:null,
    }
}

async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

    const { statusCameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraRollPermission: statusCameraRoll === 'granted' });
  }


    navLink(nav,text){
        return(
            <TouchableOpacity style={{height: 50}} onPress={() => this.props.navigation.navigate(nav)}>
            <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
        )
    }

    _pickImage = async ()=>{
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing:true,
            aspect:[1,1],
        });
        if(!result.cancelled){
            this.setState({image: result.uri});
        }
    };
    render(){
        return(


           
            <View style={styles.container}>
             <ScrollView style={styles.scrool}>
           
              
             <View style={styles.topLinks}>
             <View style={styles.profile}>
             <TouchableOpacity style={styles.imgView} onPress={this._pickImage}>
                <Image style={styles.img} source={{uri:this.state.image}}/>
             </TouchableOpacity>
             <View style={styles.profileText}>
             <Text style={styles.name}>Adella Miranda Rina</Text>
             </View>
             </View>
             </View>
            
            
            <View style={styles.bottomLinks}>
                {this.navLink('Profile','Profile')}        
                {this.navLink('Todo','Todo')}
                {this.navLink('Map','Map')}
            </View>

            </ScrollView>

           

            <View style={styles.footer}>
            <Text style={styles.description}>Drawer Apps</Text>
            <Text style={styles.version}>v1.0</Text>
            </View>

             
           
            </View>
            
        )

    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'lightgray',
    },
    scrool:{
        flex:1,

    },
    img:{
        height:70,
        width:70,
        borderRadius:50,

    },

    profileText:{
        flex:3,
        flexDirection:'column',
        justifyContent: 'center',
    },
 name:{
      fontSize:20,
      paddingBottom: 5,
      color: 'white',
      textAlign : 'left',
    },
    profile:{
        flex:1,
        flexDirection:'row',
        alignItems: 'center',
        paddingTop:25,
        borderBottomWidth: 1,
        borderBottomColor: '#777777',

    },
    imgView:{
        flex:1,
        paddingLeft:20,
        paddingRight: 20,

    },
    topLinks:{
        height:160,
        backgroundColor:'black',
    },
    // bottomLinks:{
    //     flex:1,
    //     backgroundColor :'white',
    //     paddingTop :10,
    //     paddingBottom : 200,
    
     

    // },

    link:{
        flex:1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign:'left',
    },
    footer:{
        height:50,
        flexDirection: 'row',
        alignItems:'center',
        borderTopWidth: 1,
        borderTopColor:'lightgray' ,

    },
    version:{
        flex:1,
        textAlign:'right',
        marginRight: 20,
        color:'grey',
    },
    description:{
        flex:1,
        marginLeft: 20,
        fontSize:16,
    },
})