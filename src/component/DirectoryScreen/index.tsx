import React, { useEffect } from 'react'

import { StyleSheet, View, Button, Text } from 'react-native';

import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

// REDUX
import { claimConnected } from '../../redux/features/login/connectedSlice';
import { reception } from '../../redux/features/directoryPDF/directoryPDFSlice';
import { useSelector, useDispatch } from 'react-redux';

/**
 * @Doc https://reactnative.dev/docs/typescript
 * 
 * @Link https://github.com/rnmods/react-native-document-picker
 * 
 * @Doc https://reactnative.dev/docs/permissionsandroid
 */
export default function DocumentPickerScreen(navigationData) {
  const [result, setResult] = React.useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >()

  const dispatch = useDispatch();

  const { navigation } = navigationData

  useEffect(() => {

    if (result && result[0].type === "application/pdf") {

      dispatch(reception(result))
      navigation.navigate('PdfView', {props: "pdf"})
    } else if (result && result[0].type === "image/jpeg") {

      dispatch(reception(result))
      navigation.navigate('PdfView', {props: "img"})
    }
  }, [result])

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled')
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn('multiple pickers were opened, only the last will be considered')
    } else {
      throw err
    }
  };

  // const connected = useSelector(claimConnected)

  return (
    <View style={styles.container}>

      <View style={styles.button}>

        <Button
          title="Selectionner un fichier Image"
          onPress={() => {
            DocumentPicker.pick({
              type: types.images,
            })
              .then(setResult)
              .catch(handleError)
          }}
        />
      </View>

      <View style={styles.button}>

        <Button
          title="Selectionner un fichier PDF"
          onPress={() => {
            DocumentPicker.pick({
              type: types.pdf,
            })
              .then(setResult)
              .catch(handleError)
          }}
        />
      </View>
      {/* <Text selectable>Result: {JSON.stringify(result, null, 2)}</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    marginVertical: 24
  }
})