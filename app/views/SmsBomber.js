/**
 * @format
 * @flow
 */

import React from 'react';
import Slider from 'react-native-slider';
import RNSendsms from 'react-native-sendsms';
import checkPermissionsAndRequest from '../Permissions';
import {
  Container,
  Content,
  Button,
  Text,
  Input,
  Label,
  Item,
  Form
} from 'native-base';

class SmsBomber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      message: '',
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

  _onPhoneNumberChange = phoneNumber => {
    this.setState({ phoneNumber });
  };

  _onMessageChange = message => {
    this.setState({ message });
  };

  _onAmountChange = amount => {
    this.setState({ amount });
  };

  _onDelayChange = delay => {
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
      <Container>
        <Content padder>
          <Form>
            <Item floatingLabel last>
              <Label>Phone Number:</Label>
              <Input
                maxLength={15}
                value={this.state.phoneNumber}
                onChangeText={this._onPhoneNumberChange}
                keyboardType  ="numeric"
              />
            </Item>
            <Item floatingLabel last>
              <Label>Message</Label>
              <Input
                value={this.state.message}
                onChangeText={this._onMessageChange}
              />
            </Item>
          </Form>
          <Container style={{ height: 80 }}>
            <Content padder>
              <Label>Amount: {this.state.amount}</Label>
              <Slider
                step={1}
                minimumValue={1}
                maximumValue={999}
                onValueChange={this._onAmountChange}
                value={this.state.amount}
              />
            </Content>
          </Container>
          <Container style={{ height: 80 }}>
            <Content padder>
              <Label>Delay: {this.state.delay}</Label>
              <Slider
                step={2}
                minimumValue={2}
                maximumValue={30}
                onValueChange={this._onDelayChange}
                value={this.state.delay}
              />
            </Content>
          </Container>
          <Button full info onPress={this._toggleBomber}>
            <Text>{this.state.started ? 'Stop' : 'Start'} Bomber</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default SmsBomber;
