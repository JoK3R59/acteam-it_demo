import React, { useState } from 'react';
import { Text, Dimensions, StyleSheet, View, TextInput, Button, Image } from 'react-native';

// REDUX
import { useDispatch } from 'react-redux';
import { connectedOn, connectedOff } from '../../redux/features/login/connectedSlice';

const constraints = {
    emailAdresse: "utilisateur@email.com",
    emailNotCorrect: "Veuillez saisir une adresse e-mail valide.",
    password: "demo",
    passwordNotCorrect: "Le mot de passe est incorrect."
};

const { width, height } = Dimensions.get('window');

/***
 * @public Affiche une screen avec Login et Mot de passe
 */
const LoginScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const onChangeEmail = value => setEmail(value);

    const [password, setPassword] = useState('');
    const onChangePassword = value => setPassword(value);

    const [wrongInputEmail, setWrongInputEmail] = useState(false);
    const onChangeWrongInputEmail = value => setWrongInputEmail(value);

    const [wrongInputPassword, setWrongInputPassword] = useState(false);
    const onChangeWrongInputPassword = value => setWrongInputPassword(value);

    const validation = (email) => {

        let expressionReguliere = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

        return expressionReguliere.test(email) ? true : false
    };

    const authValidation = () => {

        let lowerCaseEmail = email.toLowerCase()

        if (validation(email)) {

            let checkEmail = constraints.emailAdresse === lowerCaseEmail ? true : false
            let checkPassword = constraints.password === password ? true : false

            onChangeWrongInputEmail(!checkEmail)
            onChangeWrongInputPassword(!checkPassword)

            if (checkEmail && checkPassword) {
                dispatch(connectedOn())
                return navigation.navigate('Home')
            } else if (!checkEmail) {
                dispatch(connectedOff())
            } else {
                dispatch(connectedOff())
            }
        } else {
            onChangeWrongInputEmail(true)
            dispatch(connectedOff())
        }
    };

    return (

        <View style={styles.container}>

            <View style={styles.header}>

                <Image style={{ marginVertical: 12 }}
                    source={require('../../../assets/acteam-it.png')} />

                <Text style={{ marginVertical: 12, textAlign: 'center' }}>
                    Introduisez votre adresse e-mail et votre mot de passe pour accéder à votre compte.
                </Text>
            </View>

            <View style={styles.content}>

                <View>

                    <Text style={styles.textForInput}>
                        Adresse E-mail :
                    </Text>

                    <TextInput style={wrongInputEmail ? styles.inputFail : styles.backgroundInput}
                        placeholder="Votre Adresse E-mail"
                        value={email}
                        onChangeText={onChangeEmail}
                        keyboardType='email-address'
                    // onEndEditing = { checkEmail }
                    />

                    {wrongInputEmail ?
                        <Text style={styles.textWrongForInput}>{constraints.emailNotCorrect}</Text> :
                        null
                    }

                    <Text style={[styles.textForInput, { marginTop: 24 }]}>
                        Mot de passe :
                    </Text>

                    <TextInput style={wrongInputPassword ? styles.inputFail : styles.backgroundInput}
                        placeholder="*****"
                        value={password}
                        onChangeText={onChangePassword}
                        secureTextEntry
                    />

                    {wrongInputPassword ?
                        <Text style={styles.textWrongForInput}>{constraints.passwordNotCorrect}</Text> :
                        null
                    }
                </View>
            </View>

            <Button
                onPress={authValidation}
                title='Connexion'
                color="#06d6a0"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#fff',
        paddingHorizontal: width * 0.2,
        paddingVertical: height * 0.005
    },
    header: {
        marginBottom: 12,
        alignItems: 'center'
    },
    content: {
        alignItems: 'center',
        marginBottom: 24
    },
    textForInput: {
        marginVertical: 8
    },
    textWrongForInput: {
        color: 'red',
        fontSize: 12
    },
    backgroundInput: {
        backgroundColor: '#f0eeee',
        padding: 10,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray',
        width: width * 0.6,
    },
    inputFail: {
        borderColor: 'red',
        borderWidth: 2,
        backgroundColor: '#f0eeee',
        padding: 10,
        height: 40,
        borderRadius: 5,
        width: width * 0.6,
    }
});

export default LoginScreen;