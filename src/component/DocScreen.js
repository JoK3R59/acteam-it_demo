import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, PermissionsAndroid } from 'react-native';

import DocumentPickerScreen from './DirectoryScreen';

/**
 * 
 * @returns ICI on charge les Documents "Pictures", voir autres...
 * @public https://docs.expo.dev/versions/latest/sdk/media-library/
 */
const DocScreen = ({navigation}) => {

    const [hasPermission, setHasPermission] = useState(null);
    
    useEffect(() => {

        (async () => {
            try {
                await requestReadDirectoryPermission();
                // setHasPermission(status === 'granted');
            } catch (err) { console.warn(err); }

        })();
    }, []);

    const requestReadDirectoryPermission  = async () => {

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "App Directory Permission",
                    message:
                        "App needs access to your directory for read",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setHasPermission(true)
            } else {
            }
        } catch (err) {
            console.warn(err);
        }
    };

    if (hasPermission === false) {

        return <Text>No access to directory</Text>;
    }

    return (

        <ScrollView>
            <DocumentPickerScreen navigation={navigation}/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({});

export default DocScreen;