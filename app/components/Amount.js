import React from 'react';
import { View, Text, Slider } from 'react-native';

class Amount extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value:
        this.props.initialValue && this.props.initialValue > 0
          ? this.props.initialValue
          : 1
    };
  };

  _onChange = value => {
    this.setState({ value });
  };

  _onSlidingComplete = () => {
    console.log('update amount');
    this.props.updateAmount(this.state.value);
  };

  render() {
    return (
      <View>
        <Text>Amount: {this.state.value}</Text>
        <Slider
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={this.state.value}
          onValueChange={this._onChange}
          _onSlidingComplete={this._onSlidingComplete}
        />
      </View>
    );
  };
};

export default Amount;
