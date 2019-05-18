import React from 'react';
import { StyleSheet, Text, View,ImageBackground,SafeAreaView,TouchableOpacity } from 'react-native';
import MenuButton from '../components/MenuButton';
import {Camera,Permissions, MediaLibrary} from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';


export default class CameraScreen extends React.Component {
    constructor(props){
        super(props);
        this.state={
            hasCameraPermission: null,
            hasCameraRollPermission: null,
            imageSrc:null,
            type: Camera.Constants.Type.back,
        };
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });

        const { statusCameraRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraRollPermission: statusCameraRoll === 'granted' });
      }

handleSwitchCameraPress =() => {
        this.setState({
            type:this.state.type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front : Camera.Constants.Type.back,
        });
    };

handleTakePicturePress = async()=>{
    const {uri} = await this.camera.takePictureAsync();
    const imageSrc = uri;
    this.setState({imageSrc});
}

handleSavePicture= async()=>{
    const asset = await MediaLibrary.createAssetAsync(this.state.imageSrc);
    MediaLibrary.createAlbumAsync('Expo',asset)
    .then(()=>{
        Alert.alert('Image Saved');
    })
    .catch(error=>{
        Alert.alert('an error occured');
    })
}



  render() {
    const {hasCameraPermission,imageSrc,type}=this.state;
    if (hasCameraPermission==null){
        return null;
    }else if (hasCameraPermission==false){
        return<Text>No Access to Camera</Text>
    }

    if (imageSrc){
        return(
            <ImageBackground
                resizeMode='stretch'
                source={{uri:imageSrc}}
                style={{flex:1,justifyContent:'flex-end'}}
            >

                <View style={{flex:0.1,flexDirection:'row',justifyContent:'space-evenly'}}>
                    <TouchableOpacity
                        onPress={()=>this.setState({imageSrc:null})}
                    >
                        <Ionicons
                            name="md-trash"
                            color="white"
                            size={32}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this.handleSavePicture}
                    >
                        <Ionicons
                            name="md-save"
                            color="white"
                            size={32}
                        />
                    </TouchableOpacity>

                </View>
                
            </ImageBackground>
        );
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <Camera
                ref={(ref)=>(this.camera = ref)}
                style={{flex:1,justifyContent: 'flex-end'}}
                type={type}
            >
                <View style={{flex:0.1,flexDirection:'row',justifyContent:'space-evenly'}}>
                    <TouchableOpacity
                        onPress={this.handleTakePicturePress}
                    >
                        <Ionicons
                            name="md-camera"
                            color="white"
                            size={32}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.handleSwitchCameraPress}
                    >
                        <Ionicons
                            name="md-sync"
                            color="white"
                            size={32}
                        />
                    </TouchableOpacity>

                </View>
            </Camera>
        </SafeAreaView>
    )
  }
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
