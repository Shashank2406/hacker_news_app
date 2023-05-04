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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // <View style={styles.container}>
      <>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          showsUserLocation={true}
          region={{
            latitude: 28.5355,
            longitude: 77.391,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
        <GooglePlacesAutocomplete
          styles={{
            container: {
              position: 'absolute',
              left: 20,
              right: 20,
              top: 50,
              shadowOffset: {width: -2, height: 4},
              shadowColor: '#171717',
              shadowOpacity: 0.2,
              shadowRadius: 3,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            // dispatch(setOrigin(details.geometry.location));
            // dispatch(setDestination(null));
            // dispatch(setPlacesInfo(null));
          }}
          // currentLocation={true}
          minLength={2}
          enablePoweredByContainer={false}
          placeholder="Search here"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          fetchDetails={true}
          query={{
            key: 'AIzaSyCwcqvOdEQ7_n1goVnJhGLGndY44dFaAuM',
            language: 'en',
          }}
        />
      </>
    );
  }
}

export default Map;
