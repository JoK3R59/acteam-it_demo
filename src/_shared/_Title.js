import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

/** 
 * @public Affiche le Titre de l'APP.
 */
const _Title = () => {

    return (

        <View style={styles.container}>

            <Image 
                source={require('../../assets/acteam-it.png')} />

            <Text style={styles.font}>
                Demo.
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: "row",
        alignContent: 'flex-end',
    },
    font: {
        alignSelf:'center',
        marginHorizontal: 12,
        fontSize: 22,
    }
});

export default _Title;