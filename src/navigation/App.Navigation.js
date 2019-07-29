import { Dimensions } from 'react-native';
import { createAppContainer, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import AppStyle from '../styles/AppStyle';
import AppIntroScreen from '../screens/AppIntroScreen/AppIntroScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen/OTPVerificationScreen';

import HomeTabScreen from '../screens/HomeTabScreen/HomeTabScreen';
import CardViewScreen from '../screens/HomeTabScreen/CardViewScreen/CardViewScreen';
import SampleCardsScreen from '../screens/HomeTabScreen/SampleCards/SampleCardsScreen';
import AddCardScreen from '../screens/HomeTabScreen/AddCardScreen';
import QRCodeViewScreen from '../screens/HomeTabScreen/QRCodeViewScreen';

import SendTabScreen from '../screens/SendTabScreen/SendTabScreen';

import ProfileTabScreen from '../screens/ProfileTabScreen/ProfileTabScreen';
import EditDuitProfileScreen from '../screens/ProfileTabScreen/EditDuitProfileScreen';

import FeedbackBugScreen from '../screens/FeedbackBugScreen/FeedbackBugScreen';

const { height, width } = Dimensions.get('window');


/**
 * @name App.Navigation.js
 * @description This file contains all the navigation config for the app.
 */

const AppTabNavigator = createMaterialTopTabNavigator({

    HomeTabScreen: { screen: HomeTabScreen },
    SendTabScreen: { screen: SendTabScreen },
    ProfileTabScreen: { screen: ProfileTabScreen },
}, { 
        // initialRouteName: 'ProfileTabScreen',
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,
        optimizationsEnabled: true,
        tabBarOptions: {

            showLabel: false,
            showIcon: true,
            scrollEnabled: false,
            pressOpacity: 0.8,
            indicatorStyle: { 
                
                height: 2.5,
                borderRadius: 5,
                backgroundColor: AppStyle.primaryThemeColor 
            },
            iconStyle: {

                height: 32,
                width: 32
            },
            labelStyle: {
                
                fontSize: 12,
            },
            style: {

                backgroundColor: '#FAFAFA',
                borderTopWidth: 1,
                borderTopColor: '#F2F2F2'
            },
        }
});

// Only for iOS. After user is authenticated, he should not be able to goto verification screen by swiping.
const disableSwipeGesture = {

    navigationOptions: {
        gesturesEnabled: false,
    }
}

// The order of these screens is important
// TODO: refactor common screens in NotVerified and Verified navigator, and create an object for verified navigator.

const AppStackNavigatorNotVerified = createStackNavigator({

    AppIntroScreen: { screen: AppIntroScreen, navigationOptions: { header: null, gesturesEnabled: false } },
    OTPVerificationScreen: { screen: OTPVerificationScreen, ...disableSwipeGesture },
    EditDuitProfileScreen: { screen: EditDuitProfileScreen, ...disableSwipeGesture },
    AppTabNavigator: { screen: AppTabNavigator, ...disableSwipeGesture },
    CardViewScreen: { screen: CardViewScreen },
    SampleCardsScreen: { screen: SampleCardsScreen },
    AddCardScreen: { screen: AddCardScreen },
    QRCodeViewScreen: { screen: QRCodeViewScreen },
    FeedbackBugScreen: { screen: FeedbackBugScreen }

}, { headerMode: 'none' });

const AppStackNavigatorVerified = createStackNavigator({

    AppTabNavigator: { screen: AppTabNavigator, ...disableSwipeGesture },
    CardViewScreen: { screen: CardViewScreen },
    SampleCardsScreen: { screen: SampleCardsScreen },
    AddCardScreen: { screen: AddCardScreen },
    AppIntroScreen: { screen: AppIntroScreen, navigationOptions: { header: null, gesturesEnabled: false } },
    OTPVerificationScreen: { screen: OTPVerificationScreen, ...disableSwipeGesture },
    EditDuitProfileScreen: { screen: EditDuitProfileScreen, ...disableSwipeGesture },
    QRCodeViewScreen: { screen: QRCodeViewScreen },
    FeedbackBugScreen: { screen: FeedbackBugScreen }

}, { headerMode: 'none' });

export const AppContainerNotVerified = createAppContainer(AppStackNavigatorNotVerified);
export const AppContainerVerified = createAppContainer(AppStackNavigatorVerified);