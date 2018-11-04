import React from 'react';
import Permissions from 'react-native-permissions';
import { isNull, isUndefined } from 'lodash';
import { Alert, ToastAndroid } from 'react-native';

const strings = { 
  readPhoneState: {
    title: 'Can we read your Phone state ?',
    message: 'Access is needed to check the status of the message you are sending.'
  },
  sendSms: {
    title: 'Can we send messages using your phone ?',
    message: 'Access is needed to send SMS programatically. (Note!: Charges will apply)'
  }
}

class PermissionsCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      readPhoneState: null,
      sendSms: null
    };
  }

  componentDidMount() {
    Permissions.checkMultiple(['sendSms', 'readPhoneState']).then(
      checkResponse => {
        this.setState({
          readPhoneState: checkResponse.readPhoneState,
          sendSms: checkResponse.sendSms
        });
      }
    );
  }

  componentDidUpdate() {
    ['readPhoneState', 'sendSms'].forEach(permission => {
      if (
        !isUndefined(this.state[permission]) &&
        !isNull(this.state[permission]) &&
        this.state[permission] !== 'authorized'
      ) {
        this._alert(permission);
      }
    });
  }

  _requestPermission = permission => {
    Permissions.request(permission).then(response => {
      const state = {
        [permission]: response
      };
      this.setState(state);
    });
  };

  _alert = permission => {
    if( isUndefined(this.state[permission]) ) return;
    Alert.alert(
      strings[permission].title,
      strings[permission].message,
      [
        {
          text: 'Nope',
          onPress: () =>
            ToastAndroid.show(
              'Access denied! You will not be able to send Messages.',
              ToastAndroid.LONG
            ),
          style: 'cancel'
        },
        this.state[permission] === 'undetermined'
          ? { text: 'OK', onPress: () => this._requestPermission(permission) }
          : { text: 'Open Settings', onPress: Permissions.openSettings }
      ]
    );
  };

  render() {
    return null;
  }
}

export default PermissionsCheck;
