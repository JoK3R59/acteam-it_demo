import React from 'react';
import { StyleSheet, View } from 'react-native';

import CameraScreen from './CameraScreen';

/**
 * 
 * @public https://docs.expo.dev/versions/latest/sdk/camera/ : Doc utilisé pour la camera
 */
export default function CameraView() {

  return (

    <View style={styles.container}>
      <CameraScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 12
  },

}); 