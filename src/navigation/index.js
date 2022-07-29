
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome, Ionicons, Foundation } from '@expo/vector-icons';

import DocToPdfNavigation from './navDocToPdf';
import CameraScreen from '../component/CameraScreen';
import WebPageView from '../component/WebView';
import _Title from '../_shared/_Title';

const Tabs = createBottomTabNavigator();

/**
 * 
 * @link docs : https://reactnavigation.org/docs/bottom-tab-navigator/
 * 
 * Tabs.Navigator.screenOptions -> on gère l'affichage de l'icon en paramètre 
 * Tabs.Screen -> on gère les routes pour afficher les Views
 */
function AppNavigation() {

    return (

        <Tabs.Navigator
            screenOptions={

                ({ route }) => ({

                    tabBarIcon: ({ focused, color, size }) => {

                        if (route.name === 'Documents') {

                            return <Ionicons name="documents" size={size} color={color} />
                        }
                        else if (route.name === 'Camera') {

                            return <FontAwesome name="camera" size={size} color={color} />
                        } else if (route.name === 'Page Web') {

                            return <Foundation name="web" size={size} color={color} />
                        }
                    }
                })
            }>

            <Tabs.Screen name="Documents" component={DocToPdfNavigation}
                options={{ headerTitle: (props) => <_Title {...props} /> }} />

            <Tabs.Screen name="Camera" component={CameraScreen}
                options={{ headerTitle: (props) => <_Title {...props} /> }} />

            <Tabs.Screen name="Page Web" component={WebPageView}
                options={{ headerTitle: (props) => <_Title {...props} /> }} />
        </Tabs.Navigator>
    )
};

export default AppNavigation;