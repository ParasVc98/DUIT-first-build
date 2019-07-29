import React from 'react';
import { View, AsyncStorage, Platform, StatusBar, YellowBox } from 'react-native';

import { Provider } from 'react-redux';
import { store, persistedStore } from './src/store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { AppContainerNotVerified, AppContainerVerified } from './src/navigation/App.Navigation';
import AppStyle from './src/styles/AppStyle';

YellowBox.ignoreWarnings(['Require cycle:', 'WebView']);
const { primaryThemeColor } = AppStyle;

/**
 * @name App.js
 * @type { React.Component }
 * @description This is the root component of this project.
 */

export default class App extends React.Component {

  constructor(props) {

    super(props);

    /**
     * Set isVerified to true for development,
     * for more info please see configureStore.js
     * 
     * Checking is the user is verified or not.
     * 
     * If verified -> goto the home page, 
     * else -> to sign up page
     */

    this.state = {

      isVerified: true,
      isFontLoaded: false
    };
  };

  componentDidMount = async () => {

    let isVerified = await AsyncStorage.getItem('isVerified');

    // await Font.loadAsync({

    //   'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    //   'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    //   'Roboto-ExtraLight': require('./assets/fonts/Roboto-ExtraLight.ttf')
    // });

    if (Boolean(isVerified)) {

      this.setState({ isVerified: true });
    }

    // this.setState({ isFontLoaded: true });

    /**
     * Emulating 1-2 sec delay for custom fonts or app resource fetches.
     */

    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 1000);
  };

  render() {

    /**
     * Rendering App based on the verification status of the user. 
     */

    return (
      // <Provider store={store}>
      //   <PersistGate loading={null} persistor={persistedStore}>
      //     <View style={{ backgroundColor: "#005dc7", height: 40 }} />
          // {/* <StatusBar backgroundColor="#003A72" barStyle="light-content" />  */}
      //     {
      //       this.state.isVerified && this.state.isFontLoaded ? <AppContainerVerified /> : <AppContainerNotVerified />
      //     }
      //   </PersistGate>
      // </Provider>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
           <StatusBar backgroundColor={primaryThemeColor} barStyle='light-content' />
           <View style={{ backgroundColor: primaryThemeColor, height: Platform.OS === 'ios' ? 20 : 0 }} />
          {/* <View style={{ flex: 1, backgroundColor: primaryThemeColor }}> */}
              {
                this.state.isVerified ? <AppContainerVerified /> : <AppContainerNotVerified />
              }
          {/* </View> */}
          
        </PersistGate>
      </Provider>
    );
  };
};




