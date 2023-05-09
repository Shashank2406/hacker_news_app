import React from 'react';
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';

const DirrectionModal = ({
  visible,
  outerModalClick,
  getDirections,
  navHandle,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={{}}>
      <Pressable onPress={() => outerModalClick()} style={styles.centeredView}>
        <View style={[styles.show_modalView]}>
          <View style={styles.middleView}>
            <View style={styles.topImageContainer}>
              <Image
                style={styles.topImage}
                source={require('../../assets/cabImage.png')}
              />
              <View style={{paddingLeft: 20, justifyContent: 'space-around'}}>
                <Text style={{fontSize: 16, fontWeight: '600', color: '#000'}}>
                  Charger Point Station
                </Text>
                <Text style={{fontSize: 13, color: '#000'}}>
                  Metro Cross Road, 110003
                </Text>
                <Text style={{fontSize: 13, fontWeight: '500', color: '#000'}}>
                  4 ports available
                </Text>
              </View>
            </View>
            {/* <View style={styles.centerBorder} /> */}
            <View style={{alignItems: 'center', marginTop: 20}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navHandle()}>
                <Image
                  style={styles.buttonImg}
                  source={require('../../assets/taxiBlack.png')}
                />
                <Text style={{color: '#fff', paddingLeft: 10}}>
                  BOOK CHARGER
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center', marginBottom: 20}}>
              <TouchableOpacity
                onPress={() => getDirections()}
                style={styles.button}>
                <Image
                  style={[styles.buttonImg, {transform: [{rotate: '30deg'}]}]}
                  source={require('../../assets/direction.png')}
                />
                <Text style={{color: '#fff', paddingLeft: 5}}>
                  SHOW DIRECTIONS
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.levelContainer}>
              <View>
                <Text style={styles.textHeading}>{'Level 3'}</Text>
                <Text style={styles.subTitle}>{'PORT TYPE'}</Text>
              </View>
              <View>
                <Text style={styles.textHeading}>{'Rs 4 per kwh'}</Text>
                <Text style={styles.subTitle}>{'COST'}</Text>
              </View>
              <View>
                <Text style={styles.textHeading}>{'200 A, 96kW'}</Text>
                <Text style={styles.subTitle}>{'POWER'}</Text>
              </View>
            </View>

            <Text style={styles.additionalText}>
              {'Additional Amenities Available'}
            </Text>
            <View style={styles.additionContainer}>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={styles.img}
                  source={require('../../assets/washroom.png')}
                />
                <Text style={styles.subTitle}>{'Washroom'}</Text>
              </View>
              <View style={[styles.paddingView, {alignItems: 'center'}]}>
                <Image
                  style={styles.img}
                  source={require('../../assets/cafe.png')}
                />
                <Text style={styles.subTitle}>{'Cafe'}</Text>
              </View>
              <View style={[styles.paddingView, {alignItems: 'center'}]}>
                <Image
                  style={styles.img}
                  source={require('../../assets/room.png')}
                />
                <Text style={styles.subTitle}>{'Room'}</Text>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  show_modalView: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  middleView: {
    left: 0,
    right: 0,
    paddingVertical: 30,
  },
  button: {
    width: '90%',
    borderRadius: 5,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: '#000',
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: 'row',
  },
  topImageContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  topImage: {
    height: 80,
    width: 90,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
  },
  centerBorder: {
    borderColor: ' grey',
    borderWidth: 0.5,
    marginHorizontal: 40,
    marginTop: 20,
  },
  buttonImg: {
    tintColor: '#FFF',
    height: 20,
    width: 20,
  },
  textHeading: {fontSize: 15, fontWeight: '500', color: '#000'},
  subTitle: {fontSize: 11, paddingVertical: 5, color: '#000'},
  levelContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  additionalText: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    fontWeight: '500',
  },
  img: {height: 20, width: 20},
  paddingView: {
    paddingLeft: 40,
  },
  additionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
});
export default DirrectionModal;
