/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.replace('Login');
    }, 2000);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffff',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            height: 30,
            width: 300,
          }}
          source={require('../../assets/logo.png')}
        />
      </View>
    );
  }
}

export default Splash;
