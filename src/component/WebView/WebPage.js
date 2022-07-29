import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import { WebView } from 'react-native-webview';

// REDUX
import { sendLink } from '../../redux/features/linkWebview/linkWebviewSlice';
import { useDispatch } from 'react-redux';

/**
 * @link https://docs.expo.dev/versions/v45.0.0/sdk/webview/
 * @returns Affiche une page WEB dans l'APP
 */
export default function WebPage({ props }) {

    const checkValidateUrl = (props) => {
        let banner = ['http://','https://']
        let sliceString7 = props.slice(0,7)
        let sliceString8 = props.slice(0,8)
        if (sliceString8 === banner[1] || sliceString7 === banner[0]) {
            return props
        } else {
            return props = banner[0] + props
        }
    }

    const dispatch = useDispatch()

    return (

        <WebView
            style={styles.container}
            source={{ uri : checkValidateUrl(props) }}
            onNavigationStateChange={(navState) => {
                // Keep track of going back navigation within component
                dispatch(sendLink(navState.url))
            }}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})