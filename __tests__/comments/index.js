import React from 'react';
import 'react-native';
import {NativeModules, StatusBar} from 'react-native';
import Comments from '../../src/screens/comments';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});
import {shallow} from 'enzyme';

jest.useFakeTimers();
NativeModules.StatusBarManager = {getHeight: jest.fn()};
StatusBar.setBarStyle = jest.fn();

const navigation = {
  navigate: jest.fn(),
  addListener: jest.fn(),
  goBack: jest.fn(),
  push: jest.fn(),
};

const props = {
  navigation: navigation,
  route: {
    params: {
      selectedItem: '30620789',
    },
  },
};

it('Navigation Test', () => {
  const commentsScreenInstance = shallow(<Comments {...props} />).instance();
  expect(
    commentsScreenInstance.props.navigation.navigate,
  ).toHaveBeenCalledTimes(0);
});

it('State Verify', async () => {
  const commentsScreenInstance = shallow(<Comments {...props} />).instance();
  expect(commentsScreenInstance.state).toEqual({
    data: props.route.params.selectedItem || null,
    commentsData: [],
  });
});

it('fetchCommentsData Verify', async () => {
  const commentsScreenInstance = shallow(<Comments {...props} />).instance();
  const fetchCommentsDataSpy = jest.spyOn(
    commentsScreenInstance,
    'fetchCommentsData',
  );
  commentsScreenInstance.fetchCommentsData();
  expect(fetchCommentsDataSpy).toHaveBeenCalledTimes(1);
});

it('renders correctly', () => {
  const tree = renderer.create(<Comments {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
