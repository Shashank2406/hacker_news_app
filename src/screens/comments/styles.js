import {StyleSheet} from 'react-native';
import {Colors} from '../../config/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR_WHITE,
  },
  item: {
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
  mainView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  innerView: {
    flexDirection: 'row',
    marginTop: 15,
  },
  commentView: {
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  bottomMargin: {
    marginBottom: 150,
  },
  separatorHeight: {
    height: 1,
  },
  flatView: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  flatInnerView: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  horizontalView: {
    borderTopWidth: 1,
    marginVertical: 10,
  },
});
