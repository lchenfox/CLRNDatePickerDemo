import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Animated, Easing, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class ScanScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moveAnim: new Animated.Value(0),
        };
    }

    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
        this.state.moveAnim.setValue(0);
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -200,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            },

        ).start(() => this.startAnimation());
    };

    componentWillUnmount() {
        this.props.route.params.scanHandler('callback');
    }

    onBarCodeRead = (result) => {
        this.camera.stopRecording();
        if (this.props.scanHandler) {
            this.props.scanHandler(result.data);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.type === 'QR' &&
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        autoFocus={RNCamera.Constants.AutoFocus.on}
                        captureAudio={false}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        onBarCodeRead={(e) => this.onBarCodeRead(e)}
                    >
                        <View style={styles.rectangleContainer}>
                            <View style={styles.rectangle}/>
                            <Animated.View style={[
                                styles.border,
                                {transform: [{translateY: this.state.moveAnim}]}]}/>
                            <Text style={styles.rectangleText}>{'Scan QR code'}</Text>
                        </View>
                    </RNCamera>
                }
                {
                    this.props.type !== 'QR' &&
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        autoFocus={RNCamera.Constants.AutoFocus.on}
                        style={styles.preview}
                        type={RNCamera.Constants.Type.back}
                        flashMode={RNCamera.Constants.FlashMode.on}
                        onBarCodeRead={this.onBarCodeRead}
                        captureAudio={false}
                    >
                        <View style={styles.rectangleContainer}>
                            <View style={styles.rectangle}/>
                            <Animated.View style={[
                                styles.border,
                                {transform: [{translateY: this.state.moveAnim}]}]}/>
                            <Text style={styles.rectangleText}>{'Scan'}</Text>
                        </View>
                    </RNCamera>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10,
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#00FF00',
    },
});
