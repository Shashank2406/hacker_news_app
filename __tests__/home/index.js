import React from 'react';
import 'react-native';
import {NativeModules, StatusBar} from 'react-native';
import Home from '../../src/screens/home';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
StatusBar.setStyle = jest.fn();
jest.setTimeout(30000);
Enzyme.configure({adapter: new Adapter()});
import {shallow} from 'enzyme';

jest.useFakeTimers();
NativeModules.StatusBarManager = {getHeight: jest.fn()};

const navigation = {
  navigate: jest.fn(),
  addListener: jest.fn(),
  goBack: jest.fn(),
  push: jest.fn(),
};

const props = {
  navigation: navigation,
};

it('State Verify', async () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  expect(homeScreenInstance.state).toEqual({
    isLoading: true,
    isRefreshing: false,
    data: [],
  });
});

it('pageValue Verify', async () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  expect(homeScreenInstance.pageValue).toEqual(1);
});

it('firstValue Verify', async () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  expect(homeScreenInstance.firstValue).toEqual(0);
});

it('threshold Verify', async () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  expect(homeScreenInstance.threshold).toEqual(25);
});

it('initialData Verify', async () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  expect(homeScreenInstance.initialData).toEqual([]);
});

it('Navigation Test', () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  expect(homeScreenInstance.props.navigation.navigate).toHaveBeenCalledTimes(0);
});

it('Comments Click', () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  const onCommentSpy = jest.spyOn(homeScreenInstance, 'onCommentClick');
  homeScreenInstance.onCommentClick();
  expect(onCommentSpy).toHaveBeenCalledTimes(1);
});

it('Comments Click Return', () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  const onCommentSpy = jest.spyOn(homeScreenInstance, 'onCommentClick');
  homeScreenInstance.onCommentClick();
  expect(onCommentSpy).toHaveReturnedWith(undefined);
});

it('Pull to Refresh', () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  const onRefreshSpy = jest.spyOn(homeScreenInstance, 'onRefresh');
  homeScreenInstance.onRefresh();
  expect(onRefreshSpy).toHaveReturnedWith(undefined);
});

it('Pull to Refresh State Value', () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  homeScreenInstance.onRefresh();
  expect(homeScreenInstance.state.isRefreshing).toBe(true);
});

it('Pull to Refresh pageValue Value', () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  homeScreenInstance.onRefresh();
  expect(homeScreenInstance.pageValue).toBe(1);
});

it('Pull to Refresh firstValue Value', () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  homeScreenInstance.onRefresh();
  expect(homeScreenInstance.firstValue).toBe(0);
});

it('Pull to Refresh fetchInitialData', () => {
  const homeScreenInstance = shallow(<Home {...props} />).instance();
  const fetchInitialDataSpy = jest.spyOn(
    homeScreenInstance,
    'fetchInitialData',
  );
  homeScreenInstance.onRefresh();
  expect(fetchInitialDataSpy).toHaveBeenCalledTimes(1);
});

it('renders correctly', async () => {
  const tree = renderer.create(<Home {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
