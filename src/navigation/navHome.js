
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import _Title from '../_shared/_Title';

import AppNavigation from '../navigation';
import LoginScreen from '../component/LoginScreen';

const HomeStack = createStackNavigator();

/**
 *
 * @link docs : https://reactnavigation.org/docs/bottom-tab-navigator/
 *
 * HomeStack.Screen -> on gère les routes pour afficher les screens Login et Document après la connexion
 */
function AppHomeNavigation() {

    return (

        <NavigationContainer>

            <HomeStack.Navigator>

                <HomeStack.Screen name="Login" component={LoginScreen}
                    options={{ headerShown: false }} />

                <HomeStack.Screen name="Home" component={AppNavigation}
                    options={{ headerShown: false }} />
            </HomeStack.Navigator>
        </NavigationContainer>
    )
};

export default AppHomeNavigation;