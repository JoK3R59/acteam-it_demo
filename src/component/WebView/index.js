import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Button, ScrollView } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import WebPage from './WebPage';

// REDUX
import { getterLinkUrl } from '../../redux/features/linkWebview/linkWebviewSlice';
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

/**
 * @returns gère l'affichage de WebView avec son Input pour l'URL
 */
const PageWebView = () => {

    const [url, setUrl] = useState('https://www.acteam-it.com/')
    const onChangeLinkWeb = value => setUrl(value)

    const [sendUrl, setSendUrl] = useState('https://www.acteam-it.com/')
    const sendLinkUrl = value => setSendUrl(value)

    const getChangeUrl = useSelector(getterLinkUrl)

    useEffect(()=>{
        getChangeUrl !== sendUrl ?
        onChangeLinkWeb(getChangeUrl) :
        null
    },[getChangeUrl])

    return (
        <View style={{ flex: 1 }}>

            <View style={styles.url}>

                <TextInput
                    style={styles.backgroundInput}
                    placeholder="Saisissez une URL"
                    value={url}
                    onChangeText={onChangeLinkWeb}
                    keyboardType='url'
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => { sendLinkUrl(url) }}
                />

                <TouchableOpacity
                    onPress={() => { sendLinkUrl(url) }}
                    title=""
                    color="#841584"
                >

                    <MaterialCommunityIcons
                        style={{ marginVertical: 4 }}
                        name="search-web"
                        size={36}
                        color="black"
                    />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 2 }}>

                <WebPage props={sendUrl} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: width,
        height: '100%'
    },
    backgroundInput: {
        backgroundColor: '#f0eeee',
        padding: 10,
        height: 40,
        width: 200,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        width: width / 1.15,
        marginVertical: 4,
        marginLeft: 6
    },
    url: {
        flexDirection: "row"
    }
})

export default PageWebView;