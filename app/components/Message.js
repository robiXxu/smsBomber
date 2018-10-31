import React from 'react';

import { TextInput } from 'react-native';
import Styles from '../styles';

class Message extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  
  _updateValue = (value) => {
    this.setState({ value });
  }
  
  _onBlur = () => {
    this.props.updateMessage(this.state.value);
  }
    
  render() {
    return (
      <TextInput
        style={Styles.input}
        editable = {true}
        maxLength = {160}
        enablesReturnKeyAutomatically={true}
        returnKeyType="done"
        value={this.state.value}
        placeholder="Enter you message"
        onChangeText={this._updateValue}
        onBlur={ this._onBlur }
      />
    );
  }
};

export default Message;