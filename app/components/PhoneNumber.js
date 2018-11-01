import React from 'react';

import { TextInput } from 'react-native';
import Styles from '../styles';

class PhoneNumber extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initialValue ? this.props.initialValue : ''
    }
  }
  
  _updateValue = (value) => {
    this.setState({ value });
  }
  
  _onBlur = () => {
    console.log(this.state.value);
    this.props.updatePhoneNumber(this.state.value);
  }
    
  render() {
    return (
      <TextInput
        style={Styles.input}
        editable = {true}
        maxLength = {10}
        value={this.state.value}
        keyboardType="numeric"
        placeholder="Phone Number"
        onChangeText={this._updateValue}
        onBlur={ this._onBlur }
      />
    );
  }
};

export default PhoneNumber;