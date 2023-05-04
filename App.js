import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from './src/navigator/rootNavigator';

class App extends Component {
  constructor(props) {
    super(props);
    // setI18nConfig(); // set initial config
  }

  render() {
    return (
      // <Provider store={store}>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
      // </Provider>
    );
  }
}

export default App;
