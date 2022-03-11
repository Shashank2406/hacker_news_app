import {StyleSheet} from 'react-native';
import {Colors} from '../../config/styles';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: Colors.COLOR_WHITE,
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.COLOR_BLACK,
  },
  subText: {
    fontSize: 12,
    color: Colors.COLOR_BLACK,
  },
  byText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.COLOR_BLACK,
  },
  urlText: {
    fontSize: 10,
    color: Colors.COLOR_BLACK,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  verticalLine: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.COLOR_909090,
    marginHorizontal: 5,
  },
  separatorHeight: {
    height: 1,
  },
  flatView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  flatInnerView: {
    flexDirection: 'row',
    marginTop: 15,
  },
});
