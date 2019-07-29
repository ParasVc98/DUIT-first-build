import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Linking,
    Platform,
    Dimensions,
    Share
} from 'react-native';
import { connect } from 'react-redux';
import { Avatar, Button } from 'react-native-elements';
import TouchableBounceButton from '../../components/layout/buttons/TouchableBounceButton';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import DropdownAlert from 'react-native-dropdownalert';
import FormInputCustom from '../../components/layout/inputs/FormInputCustom';
import CountryPicker from 'react-native-country-picker-modal';
import CheckBoxCustom from '../../components/layout/inputs/CheckBoxCustom';
import * as Animatable from 'react-native-animatable';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../styles/AppStyle';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { cardPickerValueChangedHandler,
         textValueChangedHandler,
         checkBoxValueChangedHandler,
         fetchLocationDataHandler ,
         shareUserProfileHandler } from '../../store/actions/SendScreenActionCreators';
import DropDownAlertStyles from '../../styles/DropDownAlertStyles';
import CardPickerDialog from '../../components/layout/dialogs/CardPickerDialog';
import ScreenHeader from '../../components/layout/headers/ScreenHeader';
import { fetchCoordinatesData } from '../../utils/LocationUtils'

const { primaryThemeColor, primaryBackgroundColor, lightGrey0 ,lightGrey2, lightGrey4, errorRed } = AppStyle;

let AnimatableEntypo = Animatable.createAnimatableComponent(Entypo);
const checkBoxColor = '#4282ee'

/**
 * @name SendTabScreen.js
 * @type { class }
 * @description This class contains the Root SendTabScreen component used to
 *              render the SendTabScreen.
 */


class SendTabScreen extends Component {

    static navigationOptions = {

        title: 'Send',
        tabBarIcon: ({ focused, tintColor }) => (<MaterialIcons
            name={focused ? 'autorenew' : 'loop'}
            color={ focused ? primaryThemeColor : lightGrey2 }
            size={calculateFontSizeByPlatform(4.50)}
        />)
    };

    constructor(props) {

        super(props);
        this.state = {

            locationIconSize: calculateFontSizeByPlatform(6.0),
            locationPlaceholder: 'Getting Location',
            country: {
                cca2: 'US',
                callingCode: '1'
            },
            isCardPickerDisplayed: false,
        };

         /**
         * Note:
         * This is a listener added to this screen which when the screen is
         * in focus, user's location will be fetched asynchronously.
         */

        this.props.navigation.addListener('didFocus', () => this._getLocationData());
    };


    /**
     * @type { function }
     * @param { ReactRefObject }
     * @returns { Object }
     * @description Local methods that maps react ref object to a class
     *              variable.
     */

    // _cardSelectTouchableRef = ref => this.cardSelectTextRef = ref;
    _locationPinIconRef = ref => this.locationPinIconRef = ref;
    _locationTextRef = ref => this.locationTextRef = ref;


    /**
     * @type { function }
     * @param { String } fieldKey
     * @param { String } textValue
     * @returns { null }
     * @description Local method that calls textValueChanged method
     *              which is mapped to redux SendScreenAction creator.
     */

    _textChanged = (fieldKey, textValue) => this.props.textValueChanged(fieldKey, textValue);

     /**
     * @type { function }
     * @param { String } checkBoxKey
     * @returns { void }
     * @description Local method that calls checkBoxValueChanged method
     *              which is mapped to redux SendScreen action creator.
     */

    _toggleCheckBox = (checkBoxKey) => this.props.checkBoxValueChanged(checkBoxKey);


     /**
     * @type { function }
     * @param { Object } state
     * @returns { Boolean }
     * @description Local method that validates the SendScreenAction form.
     */

    _isFormValid = (state) => {

        let { isCardPicked, userNameField: userName , phoneNumberField: phoneNumber , messageField: message  } = state;

        return isCardPicked && userName.isValid && phoneNumber.isValid && message.isValid;
    };


     /**
     * @type { async function }
     * @param { none }
     * @returns { void }
     * @description Local method that is called when SendScreenTab is 
     *              focused. Plays various animations and Asks for location
     *              permissions from the user.
     */

    _getLocationData = async () => {

        fetchCoordinatesData(this._geoLocationSuccess, this._geoLocationFailure);
    };

    /**
     * @type { function }
     * @param { Object } position
     * @returns { void }
     * @description onGeoLocationSuccess callback for fetchCoordinatesData.
     *              dispatches the fetchLocationDataHandler with valid co-ordinates
     *              value.
     */

    _geoLocationSuccess = ({ coords: { latitude, longitude }}) => {
        
        this.dropDownNotification.alertWithType('success', 'Location Added', 'Successfully added your location.');
        this.props.fetchLocationData(latitude, longitude, this.locationPinIconRef, this.locationTextRef);
    };


    /**
     * @type { function }
     * @param { Object } error
     * @returns { void }
     * @description onGeoLocationFailure callback for fetchCoordinatesData.
     *              handles failure condition.
     */

    _geoLocationFailure = (error) => {

        alert(error.message);
        this.dropDownNotification.alertWithType('error', 'GPS Error', 'Cannot get your location, please enable gps.');
    };


     /**
     * @type { async function }
     * @param { none }
     * @returns { Promise }
     * @description Local method which handles the saving of user's contact to
     *              the client's device.
     */

    _saveContactToAddressBook = async () => {

    //     let { userNameField, phoneNumberField, addToPhoneBook } = this.props.sendScreenData;

    //     const clientContact = {

    //         [Contacts.Fields.FirstName]: userNameField.value,
    //         [Contacts.Fields.PhoneNumbers]: [{

    //             number: phoneNumberField.value,
    //             isPrimary: true
    //         }]
    //     };
        
    //     if(addToPhoneBook && Platform.OS === 'ios') {

    //       this.dropDownNotification.alertWithType('success', 'Contact Saved', 'Contact is saved to your addressbook');        

    //       return Contacts.addContactAsync(clientContact);

    //     } else if (addToPhoneBook && Platform.OS === 'android') {

    //         this.dropDownNotification.alertWithType('success', 'Contact Saved', 'Contact is saved to your addressbook');        
    //         return Contacts.addContactAsync(clientContact);

    //     } else return new Promise(resolve => resolve());    
    };


     /**
     * @type { async function }
     * @param { none }
     * @returns { void }
     * @description Local method which handles the share to what's app
     *              feature.
     */
    
    _shareToWhatsApp = async () => {

        let { phoneNumberField: phoneNumber, userNameField  } = this.props.sendScreenData;

        if(!this._isFormValid(this.props.sendScreenData)) {

            this.dropDownNotification.alertWithType('warn', 'Warning', 'Cannot share your profile if info. is empty');

            return;
        }

        // this.props.shareUserProfile({
        //     'mobile_number': phoneNumber.value,
        //     'mobile_country_code': '+91',
        //     'rec_name': userNameField.value
        // });

        try {

           await Linking.openURL(`whatsapp://send?text=${this._generateShareMessage()}&phone=${phoneNumber.value}`);

           await this._saveContactToAddressBook();

        } catch(error) { 
            // alert(error);
            this.dropDownNotification.alertWithType('error', 'Cannot Share Details', 'What\'s App not installed on this device');
        }
        
    };


     /**
     * @type { async function }
     * @param { none }
     * @returns { void }
     * @description Local method which handles the share with others 
     *              feature.
     */

    _shareWithOthers = async () => {
        
        if (!this._isFormValid(this.props.sendScreenData)) {

            this.dropDownNotification.alertWithType('warn', 'Warning', 'Cannot share your profile if your info. is empty');

            return;
        }

        try {

            let { userName } = this.props.sendScreenData;

            await this._saveContactToAddressBook();

            const shareResult = await Share.share({

                title: 
                    `${userName}\'s card`,
                message:
                    this._generateShareMessage(),
                url:
                    'https://www.tryduit.com/'
            }, {
                    subject: `${userName}\'s card`,
                    dialogTitle: 'Sharing'
            });

            // NOTE: URL goes by airdrop.
            
            if (shareResult.action === Share.sharedAction) {

                if (shareResult.activityType) {
                    // shared with activity type of shareResult.activityType
                } else {
                    // share
                }
            } else if (shareResult.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {

            alert(error.message + ' -> ShareToOthers Catch Block.');
        }
    };


     /**
     * @type { function }
     * @param { none }
     * @returns { String }
     * @description Local method which generates a sharable message based on
     *              the option's selected by the user.
     */

    _generateShareMessage = () => {

        let { userDesignation, userCompany, messageField: message, includeLocation, isLocationFetched } = this.props.sendScreenData;
        let { userPhoneNumber } = this.props.globalData;

        let shareMessage = `${message.value}`;

        includeLocation ?
            isLocationFetched ? shareMessage += `\n\nLocation: ${this._generateLocationInfo(isLocationFetched)}\n\n${userDesignation} at ${userCompany}\n${userPhoneNumber}\n\nGoogle Maps: ${this._generateGoogleMapsURL()}`
                              : shareMessage += `\n\nLocation: unable to retrieve location.`
            : shareMessage += `\n\n${userDesignation} at ${userCompany}\n${userPhoneNumber}\n`;

        return shareMessage;
    };
    

    /**
     * @type { function }
     * @param { Boolean }
     * @returns { String }
     * @description Local method that concats all the location data to
     *              generate an address string.
     */

    _generateLocationInfo = (isLocationFetched) => {
        
        let { locationData:{ address, displayName } } = this.props.sendScreenData;
        let { locationPlaceholder } = this.state;

        return isLocationFetched ? displayName : locationPlaceholder;
    };

    
    /**
     * @type { function }
     * @param { none }
     * @returns { String }
     * @description Local method that takes latitude and longitude
     *              from the redux state and generates a google maps
     *              url.
     */

    _generateGoogleMapsURL = () => {
        
        let { locationData: { latitude, longitude } } = this.props.sendScreenData;

        return `https://www.google.com/maps/@${latitude},${longitude},15z`;
    };


    /**
     * @type { function }
     * @param { String }
     * @returns { void }
     * @description Local method that calls cardPickerValueChanged
     *              function from SendScreen action creator on card
     *              value change.
     */

    _setCardPickerValue = (pickedValue) => {

        let { userCards } = this.props.homeScreenData;

        let pickedCard = userCards.find(card => card.designationField.value === pickedValue);

        this.props.cardPickerValueChanged({ pickedValue, pickedCard });
        this._toggleCardPicker();
    };


    /**
     * @type { function }
     * @param { none }
     * @returns { void }
     * @description Local method that toggles the cardPicker.
     */

    _toggleCardPicker = () => {

        this.setState({

            isCardPickerDisplayed: !this.state.isCardPickerDisplayed
        });
    };

    render() {

        let { 
              userName,
              profileAvatar,
              userNameField, 
              phoneNumberField, 
              messageField,
              selectedCard,
              isCardPicked,
              includeLocation,
              addToPhoneBook,
              isLocationFetched,
              shareViaWhatsapp } = this.props.sendScreenData;
        let { locationIconSize, isCardPickerDisplayed } = this.state;
        let { userCards: cardData} = this.props.homeScreenData;
        let { profileImage, firstNameField } = this.props.profileScreenData;
        let { navigate } = this.props.navigation;        

        return (
            <View style={styles.container}>

                <ScrollView contentContainerStyle={{ backgroundColor: primaryBackgroundColor }}>

                <View style={{ flex: 1 }}>

                    <ScreenHeader title={'Share'} onPress={() => navigate('HomeTabScreen')} />

                    <View style={{ flexDirection: 'row' , paddingTop: 4 , margin: responsiveHeight(2.5) }}>
                        <View style={{ flex: 1, padding: 4, alignItems: 'center', justifyContent: 'center' }}>
                            <Avatar
                                large
                                rounded
                                source={{ uri: profileAvatar === '' || profileAvatar === null || profileAvatar === undefined ? profileImage.uri : profileAvatar }}
                                activeOpacity={1.0}
                            />
                        </View>
                        <View style={{ flex: 2 }}>

                            <View style={{ flex: 3, padding: 2, justifyContent: 'flex-end' }}>
                                <Text style={{ fontSize: calculateFontSizeByPlatform(4.0), textAlign: 'left', ...lightFontStyles }}>{userName === '' || userName === null || userName === undefined ? firstNameField.value : userName }</Text>
                            </View>
                            <TouchableBounceButton onPress={this._toggleCardPicker} style={{ flex: 2, flexDirection: 'row', padding: 2 }}>

                                <Text style={{ color: isCardPicked ? '#000' : errorRed, fontSize: calculateFontSizeByPlatform(2.25), textAlign: 'left', ...lightFontStyles }}>{selectedCard}</Text> 

                                <Ionicons name={'ios-arrow-down'} size={calculateFontSizeByPlatform(3.0)} style={{ marginLeft: 8, color: isCardPicked ? '#000' : errorRed }} />

                                <CardPickerDialog togglePicker={this._toggleCardPicker} setPickerValue={this._setCardPickerValue} data={cardData} isCardPickerDisplayed={isCardPickerDisplayed} />

                            </TouchableBounceButton>

                        </View>
                    </View>

                    <FormInputCustom onChangeText={(textValue) => this._textChanged('userNameField', textValue)}
                                     label={'Recipient\'s Name'} hasError={!userNameField.isValid}
                                     errorText={userNameField.errorMessage} 
                                     value={userNameField.value} />

                    <FormInputCustom onChangeText={(textValue) => this._textChanged('phoneNumberField', textValue)}
                                     keyboardType={'numeric'} label={'Phone Number'} hasError={!phoneNumberField.isValid}
                                     errorText={phoneNumberField.errorMessage} 
                                     value={phoneNumberField.value} />

                    <View style={{ flexDirection: 'row', padding: 4, backgroundColor: 'transparent' }}>
                        <View style={{ flex: 2, padding: 2 }}>
                                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 2 , paddingVertical : responsiveHeight(1.7) }}>
                                    <CheckBoxCustom
                                        label={'Save to Phone Book'}
                                        iconSize={calculateFontSizeByPlatform(3.4)}
                                        iconType={'MaterialIcons'}
                                        checkedColor={checkBoxColor}
                                        uncheckedColor={checkBoxColor}
                                        checkedIcon={'check-box'}
                                        uncheckedIcon={'check-box-outline-blank'}
                                        isChecked={addToPhoneBook}
                                        onPress={() => this._toggleCheckBox('addToPhoneBook')}
                                    />
                                </View>

                                <View style={{
                                    backgroundColor: lightGrey0,
                                    height: responsiveHeight(1.4)
                                }} />

                                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 2, paddingVertical: responsiveHeight(0.1)}}>

                                    <View style={{ paddingVertical: responsiveHeight(0.1)}}>

                                    <CheckBoxCustom
                                        label={'Include Location'}
                                        iconSize={calculateFontSizeByPlatform(3.4)}
                                        iconType={'MaterialIcons'}
                                        checkedColor={checkBoxColor}
                                        uncheckedColor={checkBoxColor}
                                        checkedIcon={'check-box'}
                                        uncheckedIcon={'check-box-outline-blank'}
                                        isChecked={includeLocation}
                                        onPress={() => this._toggleCheckBox('includeLocation')}     
                                    />
                                    </View>
                                    <View style={{flexDirection: 'row', marginLeft: calculateFontSizeByPlatform(1)}}>


                                         <AnimatableEntypo duration={2000} ref={this._locationPinIconRef} name={'location-pin'} size={isLocationFetched ? calculateFontSizeByPlatform(4.4) : locationIconSize} style={{ color: primaryThemeColor }} /> 

                                         <View style={{ width: responsiveWidth(80)}}>
                                            <Animatable.Text duration={2000} ref={this._locationTextRef} style={{ color: primaryThemeColor, fontSize: calculateFontSizeByPlatform(1.8), ...lightFontStyles }}>{this._generateLocationInfo(isLocationFetched)}</Animatable.Text>
                                        </View>

                                    </View>
                                </View>

                                <View style={{ flex: 1, justifyContent: 'center', padding: 2, paddingVertical: responsiveHeight(1) }}>
                                    <CheckBoxCustom
                                        label={'Instant share via Whatsapp'}
                                        iconSize={calculateFontSizeByPlatform(3.4)}
                                        iconType={'MaterialIcons'}
                                        checkedColor={checkBoxColor}
                                        uncheckedColor={checkBoxColor}
                                        checkedIcon={'check-box'}
                                        uncheckedIcon={'check-box-outline-blank'}
                                        isChecked={shareViaWhatsapp}
                                        onPress={() => this._toggleCheckBox('shareViaWhatsapp')}
                                    />
                                </View> 
                        </View>
                    </View>
                    
                    {
                        (shareViaWhatsapp) 
                        ? <View style={{ flex: 1, justifyContent: 'center', padding: 8 }}>
                            <Button
                                title={'Send'}
                                Component={TouchableBounceButton}
                                backgroundColor={'#28ba09'}
                                onPress={() => this._shareToWhatsApp()}
                                icon={{ name: 'whatsapp', type: 'font-awesome', style: { fontSize: calculateFontSizeByPlatform(3.50) } }}
                                fontSize={calculateFontSizeByPlatform(2.60)}
                                buttonStyle={{

                                    borderRadius: 5
                                }}
                                textStyle={{ ...lightFontStyles }}
                            />
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', padding: 8 }}>
                            <Button
                                title={'More'}
                                Component={TouchableBounceButton}
                                backgroundColor={lightGrey4}
                                onPress={() => this._shareWithOthers()}
                                icon={{ name: 'share', type: 'entypo', style: { fontSize: calculateFontSizeByPlatform(3.50)} }}                                    
                                fontSize={calculateFontSizeByPlatform(2.60)}
                                buttonStyle={{ borderRadius: 5 }}
                                textStyle={{ ...lightFontStyles }}
                            />
                        </View>   
                    }
                </View>
                </ScrollView>

                <DropdownAlert { ...DropDownAlertStyles } ref={ref => this.dropDownNotification = ref} />                
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: primaryThemeColor
    },
    countryPicker: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const mapStateToProps = (state) => {

    return {

        globalData: state.globalData,
        homeScreenData: state.homeScreenData, 
        sendScreenData: state.sendScreenData,
        profileScreenData: state.profileScreenData
    };
};

const mapDispatchToProps = (dispatch) => {

    return {

        textValueChanged: (fieldKey, textValue) => dispatch(textValueChangedHandler(fieldKey, textValue)),
        checkBoxValueChanged: (checkBoxKey) => dispatch(checkBoxValueChangedHandler(checkBoxKey)),
        fetchLocationData: (latitude, longitude, locationPinAnimationRef, locationTextAnimationRef) => dispatch(fetchLocationDataHandler(latitude, longitude, locationPinAnimationRef, locationTextAnimationRef)),
        cardPickerValueChanged: (pickedValue) => dispatch(cardPickerValueChangedHandler(pickedValue)),
        shareUserProfile: (recipientData) => dispatch(shareUserProfileHandler(recipientData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendTabScreen);