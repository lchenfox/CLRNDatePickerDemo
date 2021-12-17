import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Modal, TouchableOpacity, SafeAreaView,
} from 'react-native';
import {DatePicker, CalendarList} from 'react-native-common-date-picker';

export default class DatePage extends React.Component {

    state = {
        visible: false,
    };

    cancel = () => {
        this.setState({
            visible: !this.state.visible,
        });
    };

    confirmDate = date => {

    };

    dateClear = () => {

    };

    onDateChange = () => {

    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate('ScanScreen', {
                        fuck: 'fuck you',
                        type: 'QR',
                        scanHandler: data => {
                            console.warn(data);
                        },
                    });
                }}>
                    <Text style={{textAlign: 'center', color: 'green', backgroundColor: 'red', padding: 25}}>Scan
                        QRCode</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.setState({
                        visible: !this.state.visible,
                    });
                }}>
                    <Text style={{textAlign: 'center', color: 'green', backgroundColor: 'red', padding: 25}}>Show Date Picker</Text>
                </TouchableOpacity>
                <Modal visible={this.state.visible} animationType={'slide'} onRequestClose={() => this.cancel()}>
                    <DatePicker
                        confirm={date => {
                            this.confirmDate(date);
                        }}
                        cancel={() => this.dateClear()}
                        cancelText={'clear'}
                        toolBarCancelStyle={{color: '#158EE9'}}
                        confirmText={'ok'}
                        toolBarConfirmStyle={{color: '#158EE9'}}
                        monthDisplayMode={'en-long'}
                        maxDate={'2026-12-31'}
                        defaultDate={new Date()}
                        onValueChange={date => this.onDateChange(date)}
                    />
                </Modal>
            </View>
        );
    }
}
