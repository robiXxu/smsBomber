import React from 'react';
import { View, Text, Slider } from 'react-native';

class Delay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value:
        this.props.initialValue && this.props.initialValue > 1
          ? this.props.initialValue
          : 2
    };
  };

  _onChange = value => {
    this.setState({ value });
  };

  _onSlidingComplete = () => {
    this.props.updateAmount(this.state.value);
  };

  render() {
    return (
      <View>
        <Text>Delay: {this.state.value}</Text>
        <Slider
          minimumValue={2}
          maximumValue={100}
          step={2}
          value={this.state.value}
          onValueChange={this._onChange}
          _onSlidingComplete={this._onSlidingComplete}
        />
      </View>
    );
  };
};

export default Delay;
