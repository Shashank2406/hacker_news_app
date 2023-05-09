import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DirrectionModal from '../../components/modal/dirrectionModal';
import MapViewDirections from 'react-native-maps-directions';
const {width, height} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 28.6448;
const LONGITUDE = 77.216721;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mapView = null;
    this.state = {
      showRoute: false,
      visible: false,
      cnt: 0,
      source: {
        latitude: LATITUDE,
        longitude: LONGITUDE - SPACE / 3,
      },
      destination: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE + SPACE,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE - SPACE,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE + 0.02,
            longitude: LONGITUDE - 0.02,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE + 0.03,
            longitude: LONGITUDE - 0.02,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE + 0.01,
            longitude: LONGITUDE - 0.02,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE - SPACE / 2,
            longitude: LONGITUDE,
          },
        },
        {
          coordinate: {
            latitude: LATITUDE,
            longitude: LONGITUDE - SPACE / 2,
          },
        },
      ],
    };
  }

  markerClicked = latLong => {
    this.setState({destination: latLong});
    this.setState({visible: true});
  };

  outerModalClick = () => {
    this.setState({visible: false});
    this.setState({showRoute: false});
  };

  getDirections = () => {
    this.setState({showRoute: true});
    this.setState({visible: false});
  };

  navHandle = () => {
    this.setState({visible: false});
    this.props.navigation.navigate('BookCharger');
  };

  render() {
    const {region, markers, visible, destination, showRoute} = this.state;
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          showsUserLocation={true}
          style={styles.map}
          initialRegion={region}
          ref={c => (this.mapView = c)}
          zoomTapEnabled={false}>
          {this.state.source ? (
            <Marker coordinate={this.state.source}>
              <Image
                style={{height: 30, width: 30}}
                source={require('../../assets/markerRed.png')}
              />
            </Marker>
          ) : null}
          {markers.map((marker, index) => {
            return (
              <Marker
                key={index.toString()}
                coordinate={markers[index].coordinate}
                onPress={e => this.markerClicked(e.nativeEvent.coordinate)}>
                <View>
                  <Image
                    style={{height: 30, width: 30}}
                    source={
                      index % 2 === 0
                        ? require('../../assets/locationRed.png')
                        : require('../../assets/markerGreen.png')
                    }
                  />
                </View>
              </Marker>
            );
          })}
          {showRoute && (
            <MapViewDirections
              origin={this.state.source}
              destination={destination}
              apikey={'AIzaSyCwcqvOdEQ7_n1goVnJhGLGndY44dFaAuM'}
              strokeWidth={2}
              strokeColor="#2A2F90"
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);

                this.mapView.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20,
                  },
                });
              }}
            />
          )}
        </MapView>
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
            this.setState({
              source: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              },
            });

            // dispatch(setOrigin(details.geometry.location));
            // dispatch(setDestination(null));
            // dispatch(setPlacesInfo(null));
          }}
          // currentLocation={true}
          minLength={2}
          enablePoweredByContainer={false}
          placeholder="Search here"
          placeholderTextColor="#000"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          fetchDetails={true}
          query={{
            key: 'AIzaSyCwcqvOdEQ7_n1goVnJhGLGndY44dFaAuM',
            language: 'en',
          }}
        />
        <DirrectionModal
          {...{
            visible,
            outerModalClick: this.outerModalClick,
            getDirections: this.getDirections,
            navHandle: this.navHandle,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  customView: {
    width: 140,
    height: 140,
  },
  plainView: {
    width: 60,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  calloutButton: {
    width: 'auto',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default Map;
