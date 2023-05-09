import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
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
  buttonImg: {
    tintColor: '#FFF',
    height: 20,
    width: 20,
  },
});

export default styles;
