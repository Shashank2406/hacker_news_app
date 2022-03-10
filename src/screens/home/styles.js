import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#ffff',
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 12,
  },
  byText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'grey',
  },
  urlText: {
    fontSize: 10,
    color: 'grey',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  verticalLine: {
    borderLeftWidth: 1,
    borderLeftColor: '#909090',
    marginHorizontal: 5,
  },
});
