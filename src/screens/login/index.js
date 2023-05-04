/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from './styles';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#ffff',
          // justifyContent: 'center',
        }}>
        <View
          style={{
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: 30,
              width: 300,
              marginVertical: 100,
            }}
            source={require('../../assets/logo.png')}
          />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Phone number / Email Id"
              placeholderTextColor="grey"
              // onChangeText={email => setEmail(email)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              // onChangeText={password => setPassword(password)}
            />
          </View>
          <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              this.props.navigation.replace('Map');
            }}>
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>
          <Text style={styles.noAccount}>Don't have an account?</Text>
          <TouchableOpacity style={styles.loginBtn2}>
            <Text style={styles.loginText2}>Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Login;
