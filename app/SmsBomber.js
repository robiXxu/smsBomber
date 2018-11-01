/**
 * @format
 * @flow
 */

import React from 'react';
import { Text, View, TouchableOpacity, Slider } from 'react-native';
import RNSendsms from 'react-native-sendsms';
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
      delay: 2,
      started: false
    };
  }

  componentDidMount() {
    checkPermissionsAndRequest(['sendSms', 'readPhoneState']);
  }

  _sendSms = () => {
    setTimeout(() => {
      if (
        this.state.phoneNumber.trim().length &&
        this.state.message.trim().length &&
        this.state.started &&
        this.state.amount > 0
      ) {
        RNSendsms.send(
          Date.now(),
          this.state.phoneNumber,
          this.state.message,
          (msgId, status) => {
            console.log(msgId, status);
            this.setState(
              prevState => ({
                amount: prevState.amount - 1
              }),
              () => this._sendSms
            );
          }
        );
      } else {
        this.setState({
          amount: 1,
          started: false
        });
      }
    }, this.state.delay * 1000);
  };

  _updatePhoneNumber = phoneNumber => {
    this.setState({ phoneNumber });
  };

  _updateMessage = message => {
    this.setState({ message });
  };

  _updateAmount = amount => {
    this.setState({ amount });
  };

  _updateDelay = delay => {
    this.setState({ delay });
  };

  _toggleBomber = () => {
    this.setState(prevState => ({
      started: !prevState.started
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.started) {
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
          style={Styles.slider}
          minimumValue={1}
          maximumValue={999}
          step={1}
          value={this.state.amount}
          onValueChange={this._updateAmount}
        />
        <Text>Delay: {this.state.delay} seconds</Text>
        <Slider
          style={Styles.slider}
          minimumValue={2}
          maximumValue={100}
          step={2}
          value={this.state.delay}
          onValueChange={this._updateDelay}
        />

        <TouchableOpacity style={Styles.button} onPress={this._toggleBomber}>
          <Text>{this.state.started ? 'Stop' : 'Start'} Bomber</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SmsBomber;
