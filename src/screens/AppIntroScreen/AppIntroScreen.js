import React, { Component } from 'react';
import { 
    View,
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TouchableBounceButton from '../../components/layout/buttons/TouchableBounceButton';
import AppIntroSlider from 'react-native-app-intro-slider';

/**
 * @name AppIntroScreen.js
 * @type { class }
 * @description This class contains the root component used to
 *              render the AppIntroScreen.
 */

const { height, width } = Dimensions.get('window');

/**
 * Path to Images stored in the app assets.
 */

const PATH_TO_IMAGES = '../../../assets/images/appintro';

const styles = StyleSheet.create({

    slideImage: {

        maxWidth: width * 2 / 3,
        maxHeight: height * 2 / 3
    },
    buttonCircle: {

        width: 64,
        height: 64,
        marginRight: 10,
        marginBottom: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

/**
 * Slides array is mapped to UI, each element object contains some config.
 */

const Slides = [
    {
        key: 'screen-1',
        title: 'Create a Business',
        text: 'Create multiple cards',
        image: require(`${PATH_TO_IMAGES}/screen1.png`),
        imageStyle: styles.slideImage,
        backgroundColor: '#003366',
    },
    {
        key: 'screen-2',
        title: 'Share it hassle-free',
        text: 'Share your card with others',
        image: require(`${PATH_TO_IMAGES}/screen2.png`),
        imageStyle: styles.slideImage,
        backgroundColor: '#0984e3',
    },
    {
        key: 'screen-3',
        title: 'Manage your contacts with ease',
        text: 'Customise and personalize your cards',
        image: require(`${PATH_TO_IMAGES}/screen3.png`),        
        imageStyle: styles.slideImage,
        backgroundColor: '#74b9ff',
    }
];

class AppIntroScreen extends Component {

    /**
     * @type { function }
     * @param { String } path
     * @returns { null }
     * @description Local method that navigates the app to the specified
     *              path provided.
     */

    _navigate = (path) => {
        
        let { navigation } = this.props;
        navigation.navigate(path);
    };


    /**
     * @type { function }
     * @returns { ReactNode }
     * @description Local method that renders next button.
     */

    _renderNextButton = () => {

        return (
            <View style={styles.buttonCircle}>
                <Ionicons
                    name='ios-arrow-round-forward'
                    color='rgba(255, 255, 255, 0.9)'
                    size={48}
                    style={{ marginTop: Platform.OS === 'android' ? 0 : 5, textAlign: 'center' }}
                />
            </View>
        );
    };

     /**
     * @type { function }
     * @returns { ReactNode }
     * @description Local method that renders done button.
     */

    _renderDoneButton = () => {

        return (
            <TouchableBounceButton style={styles.buttonCircle} onPress={() => this._navigate('OTPVerificationScreen')}>
                <Ionicons
                    name='ios-checkmark'
                    color='rgba(255, 255, 255, 0.9)'
                    size={52}
                    style={{ marginTop: Platform.OS === 'android' ? 0 : 5, textAlign: 'center' }}
                />
            </TouchableBounceButton>
        );
    };

    render() {
        
        return (

            <View style={{ flex: 1, backgroundColor: '#FAFAFA', /*marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight,*/marginTop:0, height, width }}>
                <AppIntroSlider
                    slides={Slides}
                    renderDoneButton={this._renderDoneButton}
                    renderNextButton={this._renderNextButton}
                />
            </View>
        );
    };
};

export default AppIntroScreen;