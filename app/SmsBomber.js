/**
 * @format
 * @flow
 */

import React from 'react';
import { Text, View, TouchableOpacity, Slider } from 'react-native';
import RNSendsms from 'react-native-sendsms';
import * as uuid from 'uuid';
import { isNull } from 'lodash';
import checkPermissionsAndRequest from './Permissions';
import { PhoneNumber, Message } from './components';
import Styles from './styles';

class SmsBomber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '0749044766',
      message: 'test',
      amount: 1,
      started: false
    };
    this._interval = null;
  }

  componentDidMount() {
    checkPermissionsAndRequest(['sendSms', 'readPhoneState']);
  }

  _sendSms = () => {
    if (
      this.state.phoneNumber.trim().length &&
      this.state.message.trim().length &&
      this.state.amount > 0
    ) {
      console.log("here?", this.state);
      RNSendsms.send(
        Date.now(),
        this.state.phoneNumber,
        this.state.message,
        (msgId, status) => {
          console.log(msgId, status);
          this.setState((prevState) => ({
            amount: prevState.amount - 1
          }), () => this._sendSms);
        }
      );
    } else {
      console.log('ended');
      this.setState({ 
        amount: 1,
        started: false 
      });
    }
  };

  _updatePhoneNumber = phoneNumber => {
    this.setState({ phoneNumber });
  };

  _updateMessage = message => {
    this.setState({ message });
  };

  _updateAmount = amount => {
    console.log(amount);
    this.setState({ amount });
  };

  _toggleBomber = () => {
    this.setState(prevState => ({
      started: !prevState.started
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.started && isNull(this._interval)) {
      this._sendSms();
    }
  }

  render() {
    return (
      <View style={Styles.container}>
        <PhoneNumber
          initialValue={this.state.phoneNumber}
          updatePhoneNumber={this._updatePhoneNumber}
        />
        <Message
          initialValue={this.state.message}
          updateMessage={this._updateMessage}
        />
        <Text>Amount: {this.state.amount}</Text>
        <Slider
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={this.state.amount}
          onValueChange={this._updateAmount}
        />

        <TouchableOpacity style={Styles.button} onPress={this._toggleBomber}>
          <Text>{this.state.started ? 'Stop' : 'Start'} Bomber</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SmsBomber;
