import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
class LandingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  loginPage = () => {
    const userInfo = {name: 'Nasco App'};
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View>
        <Text> LandingScreen </Text>
        <TouchableOpacity onPress={() => this.loginPage()}>
          <Text style={{fontSize: 14, color: '#000'}}>{'hell0'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LandingScreen;
