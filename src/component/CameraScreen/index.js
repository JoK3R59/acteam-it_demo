import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';

import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

/**
 * 
 * @Solution_Image_Base64 https://stackoverflow.com/questions/29380265/does-react-native-support-base64-encoded-images
 */
export default function CameraView() {

  const [hasPermission, setHasPermission] = useState(null);
  const [hasPermissionMediaLibrary, setHasPermissionMediaLibrary] = useState(null);

  const [type, setType] = useState(CameraType.back);

  const [camera, setCamera] = useState({})

  const [getCaptureOn, setGetCaptureOn] = useState(false)
  const [uriImageBase64, setUriImageBase64] = useState("")

  const isFocused = useIsFocused();

  useEffect(() => {

    (async () => {

      const { status } = await Camera.requestCameraPermissionsAsync();
      const statusMediaLibrary = await MediaLibrary.requestPermissionsAsync()

      setHasPermission(status === 'granted');
      setHasPermissionMediaLibrary(statusMediaLibrary.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {

    if (isFocused) {

      const image = await camera.takePictureAsync()
      setGetCaptureOn(true)
      const asset = await MediaLibrary.createAssetAsync(image.uri)
      const album = await MediaLibrary.createAlbumAsync('ActeamITAlbum', asset, false)
      const albumAssets = await MediaLibrary.getAssetsAsync({
        album: album,
        first: 1
      })
      setUriImageBase64(albumAssets.assets[0].uri)
    }
    // console.log("takePicture in CameraView result : ",uriImageBase64)
    // const imageUri = albumAssets.assets[0].uri
  }

  // const processPicture = photo => {
  //   // console.log("PHOTO -> ", photo);
  //   let imageBase64 = photo.base64 ? 'data:image/png;base64,' + photo.base64 : null
  //   setUriImageBase64(imageBase64)

    
  // }



  if (hasPermission === null) {

    return <View />;
  } else if (hasPermission === false) {

    return <Text>No access to camera</Text>;
  }

  return (

    <View style={styles.container}>
        {
          isFocused && <>
            <Camera
              ref={(ref) => {
                setCamera(ref)
              }}
              style={styles.camera}
              type={type}
              PermissionResponse='never'
            >

              <View style={styles.buttonContainer}>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {

                    setType(type === CameraType.back ? CameraType.front : CameraType.back);
                  }}>

                  {type === CameraType.back ?
                    (<>
                      <MaterialIcons name="camera-front" size={48} color="white" />
                      <Text style={styles.text}>Avant</Text>
                    </>) :
                    (<>
                      <MaterialIcons name="camera-rear" size={48} color="white" />
                      <Text style={styles.text}>Arrière</Text>
                    </>)
                  }
                </TouchableOpacity>
              </View>
            </Camera>
            <TouchableOpacity style={styles.screenshot}
              onPress={takePicture}>

              <FontAwesome5 name="dot-circle" size={64} color="black" />
            </TouchableOpacity>
          </>
        }
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    height: height * 0.65,
    width: width
  },
  button: {
    marginLeft: 18,
    marginTop: 18
  },
  screenshot: {
    marginVertical: height * 0.035,
    alignSelf: 'center'
  },
  text: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  }
}); 