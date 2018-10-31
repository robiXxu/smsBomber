/**
 * @format
 * @flow
 */

import React from 'react';
import { Text, View, TouchableOpacity, ToastAndroid } from 'react-native';
import RNSendsms from 'react-native-sendsms';
import checkPermissionsAndRequest from './Permissions';
import { PhoneNumber, Message } from './components';
import Styles from './styles';

class SmsBomber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: null,
      message: null
    };
  }

  componentDidMount() {
    checkPermissionsAndRequest(['sendSms', 'readPhoneState']);
  }

  _sendSms = () => {
    RNSendsms.send(
      Date.now(),
      this.state.phoneNumber,
      this.state.message,
      (msgId, status) => {
        ToastAndroid.show(JSON.stringify(status), ToastAndroid.SHORT);
      }
    );
  };

  _updatePhoneNumber = phoneNumber => {
    this.setState({ phoneNumber });
  };

  _updateMessage = message => {
    this.setState({ message });
    console.log(this.state);
  };

  render() {
    return (
      <View style={Styles.container}>
        <PhoneNumber updatePhoneNumber={this._updatePhoneNumber} />
        <Message updateMessage={this._updateMessage} />
        <TouchableOpacity style={Styles.button} onPress={this._sendSms}>
          <Text>Start Bomber</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SmsBomber;
