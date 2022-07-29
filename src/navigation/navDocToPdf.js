
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import _Title from '../_shared/_Title';

import PDFScreen from '../component/PdfScreen/PDFScreen';
import DocScreen from '../component/DocScreen';

// REDUX
import { receptionPDF } from '../redux/features/directoryPDF/directoryPDFSlice';
import { useSelector } from 'react-redux';

const PdfStack = createStackNavigator();

/**
 * @link docs : https://reactnavigation.org/docs/stack-navigator/
 *
 * HomeStack.Screen -> on gère les routes pour afficher les screens Login et Document après la connexion
 */
function DocToPdfNavigation() {

    const [title, setTitle] = useState('')

    const data = useSelector(receptionPDF)

    useEffect(() => {

        if (data.length >= 0) {
            const titlePdf = data[0].name
            setTitle(titlePdf)
        }
    }, [data])

    return (

        <PdfStack.Navigator>

            <PdfStack.Screen name="document" component={DocScreen}
                options={{ headerShown: false }} />

            <PdfStack.Screen name="PdfView" component={PDFScreen}
                options={{ headerTitle: title }} />
        </PdfStack.Navigator>
    )
};

export default DocToPdfNavigation;