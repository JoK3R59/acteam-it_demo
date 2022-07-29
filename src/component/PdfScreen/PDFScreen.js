import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    SafeAreaView,
    TouchableHighlight,
    Text,
    Image
} from 'react-native';

import Pdf from 'react-native-pdf';

// REDUX
import { receptionPDF } from '../../redux/features/directoryPDF/directoryPDFSlice';
import { useSelector } from 'react-redux';

const WIN_WIDTH = Dimensions.get('window').width;
const WIN_HEIGHT = Dimensions.get('window').height;

const ImageViewer = () => {

    const data = useSelector(receptionPDF)

    const [sourceImg, setSourceImg] = useState('')

    useEffect(() => {

        data.length >= 0 ? setSourceImg(data[0].uri) : null
    }, [data])

    return (
        <View
            style={{
                width: WIN_WIDTH,
                height: WIN_HEIGHT,
            }}
        >
            <Image
                style={{
                    width: WIN_WIDTH,
                    height: WIN_HEIGHT * 0.7,
                    resizeMode: 'contain'
                }}
                source={{ uri: sourceImg? sourceImg : "../../assets/blanc.jpg" }}
            />
        </View>
    )
}

/**
* @Doc https://www.npmjs.com/package/react-native-pdf
* @Solution https://github.com/expo/config-plugins/tree/main/packages/react-native-pdf
*/
const PDFScreen = (props) => {

    const selectImgOrPdf = props.route.params.props

    // false = pdf || true = image
    const [pdfOrImage, setpdfOrImage] = useState(undefined)

    const [source, setSource] = useState({
        uri: '',
        cache: true,
    })

    const [config, setConfig] = useState({
        blob: undefined,
        objectURL: '',
        page: 1,
        scale: 1,
        numberOfPages: 0,
        horizontal: false,
        width: WIN_WIDTH
    })
    const [viewPdf, setViewPdf] = useState(null)

    const data = useSelector(receptionPDF)

    useEffect(() => {

        selectImgOrPdf === 'img' ? setpdfOrImage(true) : setpdfOrImage(false)

        if (data.length >= 0) {
            const uri = data[0].uri
            setSource({ ...source, uri: uri })
        } else {
            const uri = 'http://samples.leanpub.com/thereactnativebook-sample.pdf'
            setSource({ ...source, uri: uri })
        }
    }, [data])

    const prePage = () => {
        let prePage = config.page > 1 ? config.page - 1 : 1
        setViewPdf(viewPdf.setPage(prePage))
        // console.log(`prePage: ${prePage}`)
    };

    const nextPage = () => {
        let nextPage = config.page + 1 > config.numberOfPages ? config.numberOfPages : config.page + 1
        setViewPdf(viewPdf.setPage(nextPage))
        // console.log(`nextPage: ${nextPage}`)
    };

    // const zoomOut = () => {
    //     let scale = config.scale
    //     scale = scale > 1 ? scale / 1.2 : 1
    //     setConfig({...config, scale: scale })
    //     console.log(`zoomOut scale: ${scale}`)
    // };

    // const zoomIn = () => {
    //     let scale = config.scale
    //     scale = scale * 1.2
    //     scale = scale > 3 ? 3 : scale
    //     setConfig({...config, scale: scale })
    //     console.log(`zoomIn scale: ${scale}`)
    // };

    return (

        <SafeAreaView style={styles.container}>

            {!pdfOrImage &&
                <>

                    <View style={{ flexDirection: 'row' }}>

                        <TouchableHighlight
                            disabled={config.page === 1}
                            style={config.page === 1 ? styles.btnDisable : styles.btn}
                            onPress={() => prePage()}>

                            <Text style={styles.btnText}>
                                {'-'}
                            </Text>
                        </TouchableHighlight>

                        <View style={styles.btnText}>

                            <Text style={styles.btnText}>
                                Page {config.page} / {config.numberOfPages}
                            </Text>
                        </View>

                        <TouchableHighlight disabled={config.page === config.numberOfPages}
                            style={config.page === config.numberOfPages ? styles.btnDisable : styles.btn}
                            testID='NextPage'
                            onPress={() => nextPage()}>

                            <Text style={styles.btnText}>
                                {'+'}
                            </Text>
                        </TouchableHighlight>

                        {/* <TouchableHighlight disabled={config.scale === 1}
                    style={config.scale === 1 ? styles.btnDisable : styles.btn}
                    onPress={() => zoomOut()}>

                    <Text style={styles.btnText}>
                        {'-'}
                    </Text>
                </TouchableHighlight>

                <View style={styles.btnText}>

                    <Text style={styles.btnText}>
                        Zoom
                    </Text>
                </View>

                <TouchableHighlight disabled={config.scale >= 3}
                    style={config.scale >= 3 ? styles.btnDisable : styles.btn}
                    onPress={() => zoomIn()}>

                    <Text style={styles.btnText}>
                        {'+'}
                    </Text>
                </TouchableHighlight> */}
                    </View>

                    <View style={{ flex: 1, width: WIN_WIDTH, backgroundColor: undefined }}>

                        <Pdf
                            ref={(pdf) => {
                                setViewPdf(pdf)
                            }}
                            trustAllCerts={false}
                            source={source}
                            scale={config.scale}
                            // horizontal={config.horizontal}
                            onLoadComplete={(numberOfPages, filePath, { width, height }, tableContents) => {
                                setConfig({
                                    ...config,
                                    numberOfPages: numberOfPages
                                });
                            }}
                            onPageChanged={(page, numberOfPages) => {
                                setConfig({
                                    ...config,
                                    page: page
                                });
                            }}
                            onError={(error) => {
                                console.log(error);
                            }}
                            style={{ flex: 1 }}
                        />
                    </View>
                </>
            }
            {
                pdfOrImage && <ImageViewer />
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 2,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    btn: {
        margin: 2,
        padding: 2,
        backgroundColor: "aqua",
    },
    btnDisable: {
        margin: 2,
        padding: 2,
        backgroundColor: "gray",
    },
    btnText: {
        marginVertical: 2,
        marginHorizontal: 4,
        padding: 2,
    }
});

export default PDFScreen;