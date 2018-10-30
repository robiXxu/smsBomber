/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { each, omit } from 'lodash';
import Permissions from 'react-native-permissions';
import RNSendsms from 'react-native-sendsms';

class SmsBomber extends Component {
  componentDidMount() {
    this._checkPermissionsAndRequest(['sendSms', 'readPhoneState']);
  }

  _checkPermissionsAndRequest = (permissions) => { 
    if(!permissions.length) return;
    const proms = [];
    const permissionsToOmit = [];

    Permissions.checkMultiple(permissions).then( checkResponse => {
      each(checkResponse, (response, permission) => {
        if( response !== "authorized" ) {
          proms.push(Permissions.check(permission));
        } else {
          permissionsToOmit.push(permissionsToOmit);
        }
      });

      if( proms.length ) {
        _checkPermissionsAndRequest(omit(permissions, permissionsToOmit));
      }
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // ToastAndroid.show( Object.keys(RNSendsms).join(','), ToastAndroid.LONG);
            RNSendsms.send(123, '0749044766', 'test', (msgId, status) => {
              ToastAndroid.show(JSON.stringify(status), ToastAndroid.SHORT);
            });
          }}
        >
          <Text>Send SMS111</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  button: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#bbb',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SmsBomber;
