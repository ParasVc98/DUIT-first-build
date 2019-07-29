import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import config from '../../config/api.config';
import DropdownAlert from 'react-native-dropdownalert';
import DropDownAlertStyles from '../../styles/DropDownAlertStyles';
import Spinner from 'react-native-loading-spinner-overlay';
import Form from 'react-native-form';
import CountryPicker from 'react-native-country-picker-modal';
import AppStyle, { lightFontStyles } from '../../styles/AppStyle';


/**
 * @name OTPVerificationScreen.js
 * @type { class }
 * @description This class contains the root component used to
 *              render the OTPVerificationScreen.
 */

const MAX_LENGTH_CODE = 6;
const MAX_LENGTH_NUMBER = 12;

// Brand's theme primary color
const brandColor = AppStyle.primaryThemeColor;

// Customize the country picker
const countryPickerCustomStyles = StyleSheet.create({

    itemCountryName: {

        borderBottomWidth: 0
    }
});

const styles = StyleSheet.create({

    countryPicker: {

        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {

        flex: 1
    },
    header: {

        textAlign: 'center',
        marginTop: 60,
        fontSize: 22,
        margin: 20,
        color: '#4A4A4A',
        ...lightFontStyles
    },
    form: {

        margin: 20
    },
    textInput: {

        padding: 0,
        margin: 0,
        flex: 1,
        fontSize: 20,
        color: brandColor,
        ...lightFontStyles
    },
    button: {

        marginTop: 20,
        height: 50,
        backgroundColor: brandColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    buttonText: {

        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        ...lightFontStyles
    },
    wrongNumberText: {

        margin: 10,
        fontSize: 14,
        textAlign: 'center',
        ...lightFontStyles
    },
    disclaimerText: {

        marginTop: 30,
        fontSize: 12,
        color: 'grey',
        ...lightFontStyles
    },
    callingCodeView: {

        alignItems: 'center',
        justifyContent: 'center'
    },
    callingCodeText: {

        fontSize: 20,
        color: brandColor,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        ...lightFontStyles
    }
});

class OTPVerificationScreen extends Component {

    constructor(props) {

        super(props);

        this.state = {

            enterCode: false,
            spinner: false,
            textInputValue: '',
            otp: '',
            temporaryToken: '',
            country: {
                cca2: 'IN',
                callingCode: '91'
            }
        };
    };

     /**
     * @type { async function }
     * @description Local methods that request's the otp from the server.
     */

    _getCode = async () => {

        // These 2 things are semantically same.
        let { textInputValue: phoneNumber, country: { callingCode }} = this.state;
        // let phoneNumber  = this.state.textInputValue;
        // let callingCode  = this.state.country.callingCode;
        
        this.setState({ spinner: true });

            try {

                const requestOtpOptions = {

                    method: 'POST',
                    headers: {

                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ mobile_number_full: `${callingCode}${phoneNumber}` })
                };

                // TODO: research on this new syntax. ES7 syntax. No performance impact.
               const requestResponse = await fetch(`${config.duitServerUrl}/api/v1/validate_phone/`, requestOtpOptions).then(res => res.json());

               let { status } = requestResponse;

                this.setState({ spinner: false, phoneNumber });

                if(status) {

                    this.setState({ enterCode: true });
                    this.dropDownNotification.alertWithType('info', 'OTP Sent', 'OTP sent to your number');
                    this.refs.form.refs.textInput.setNativeProps({ text: '' });            
                }
                else
                   this.dropDownNotification.alertWithType('error', 'OTP Not Sent', 'Unable to send the OTP');                    
            

            } catch (error) {
                
                this.setState({ spinner: false });
                alert('Error sending the otp');
            }
    };


    /**
     * @type { async function }
     * @description Local methods that verifies the otp with the server
     *              and navigates the user to the main app interface.
     */

    _verifyCode = async () => {
        
        this.setState({ spinner: true });

        let { textInputValue: otp, phoneNumber, country: { callingCode } } = this.state;

        try {

                const verifyOtpOptions = {

                    method: 'POST',
                    headers: {

                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({

                        otp,
                        mobile_number_full: `${callingCode}${phoneNumber}`
                    })
                };

            const verificationResponse = await fetch(`${config.duitServerUrl}/api/v1/validate_otp/`, verifyOtpOptions).then(res => res.json());

            let { status } = verificationResponse;

                this.refs.form.refs.textInput.blur();

                this.setState({ spinner: false });

                if(status) {

                    this.dropDownNotification.alertWithType('success', 'Verified', 'Your phone number is verified');

                    await AsyncStorage.setItem('isVerified', 'true');

                    // Dispatch verification details to the store.
                    this.props.userVerificationHandler(`+${callingCode}-${phoneNumber}`);

                    // Navigate to edit duit screen.
                    setTimeout(() => {
                        this.props.navigation.navigate('EditDuitProfileScreen', { from_screen: 'OTPVerificationScreen' });
                    }, 1600, this);
                }
                else
                    this.dropDownNotification.alertWithType('error', 'Not Veified', 'The Otp you provided is incorrect');

            } catch (error) {
            
                this.setState({ spinner: false });
                alert('Error verifying the otp you provided');
            }

    };

    _onChangeText = (value) => {

        this.setState({ textInputValue: value });

        if (value.length === MAX_LENGTH_CODE && this.state.enterCode) {

            setTimeout(() => {
                this._verifyCode();                
            }, 400, this);
        }
    };

    _tryAgain = () => {

        this.refs.form.refs.textInput.setNativeProps({ text: '' })
        this.refs.form.refs.textInput.focus();
        this.setState({ enterCode: false });
    };

    _getSubmitAction = () => {

        let { textInputValue } = this.state;

        if(textInputValue === '') {

            this.dropDownNotification.alertWithType('error', 'Invalid Phone Number', 'Please provide valid phone number');            
            return;
        }

        this.state.enterCode ? this._verifyCode() : this._getCode();
    };

    _changeCountry = (country) => {

        this.setState({ country });
        this.refs.form.refs.textInput.focus();
    };

    _renderFooter = () => {

        if (this.state.enterCode)
            return (
                <View>
                    <Text style={styles.wrongNumberText} onPress={this._tryAgain}>
                        Enter the wrong number or need a new code?
                    </Text>
                </View>
            );

        return (
            <View>
                <Text style={styles.disclaimerText}>By tapping "Send confirmation code" above, we will send you an SMS to confirm your phone number. Message &amp; data rates may apply.</Text>
            </View>
        );

    };

    _renderCountryPicker = () => {

        if (this.state.enterCode)
            return (
                <View />
            );

        return (
            <CountryPicker
                ref={'countryPicker'}
                closeable
                filterable
                flagType={'flat'}
                animationType={'slide'}
                autoFocusFilter={false}
                style={styles.countryPicker}
                onChange={this._changeCountry}
                cca2={this.state.country.cca2}
                styles={countryPickerCustomStyles}
                translation='eng' />
        );

    }

    _renderCallingCode = () => {

        if (this.state.enterCode)
            return (
                <View />
            );

        return (
            <View style={styles.callingCodeView}>
                <Text style={styles.callingCodeText}>+{this.state.country.callingCode}</Text>
            </View>
        );

    }

    render() {

        let headerText = `What's your ${this.state.enterCode ? 'verification code' : 'phone number'}?`
        let buttonText = this.state.enterCode ? 'Verify confirmation code' : 'Send confirmation code';
        let textStyle = this.state.enterCode ? {
            height: 50,
            textAlign: 'center',
            fontSize: 40,
            fontWeight: 'bold',
        } : {};

        return (

            <View style={styles.container}>

                <Text style={styles.header}>{headerText}</Text>

                <Form ref={'form'} style={styles.form}>

                    <View style={{ flexDirection: 'row' }}>

                        { this._renderCountryPicker() }
                        { this._renderCallingCode() }

                        <TextInput
                            ref={'textInput'}
                            name={this.state.enterCode ? 'code' : 'phoneNumber'}
                            type={'TextInput'}
                            underlineColorAndroid={'transparent'}
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            onChangeText={this._onChangeText}
                            placeholder={this.state.enterCode ? '_ _ _ _ _ _' : 'Phone Number'}
                            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                            style={[styles.textInput, textStyle]}
                            returnKeyType='go'
                            autoFocus
                            placeholderTextColor={brandColor}
                            selectionColor={brandColor}
                            maxLength={this.state.enterCode ? 6 : 20}
                            onSubmitEditing={this._getSubmitAction} />

                    </View>

                    <TouchableOpacity style={styles.button} onPress={this._getSubmitAction}>
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>

                    { this._renderFooter() }

                </Form>

                <Spinner
                    animation={'fade'}
                    overlayColor={'rgba(0,0,0,0.8)'}
                    visible={this.state.spinner}
                    textContent={'One moment...'}
                    textStyle={{ color: '#FFF' }} />

                <DropdownAlert { ...DropDownAlertStyles } ref={ref => this.dropDownNotification = ref} />                                                
            </View>

        );
    }
};

const mapDispatchToProps = (dispatch) => {

    return {

        userVerificationHandler: (userPhoneNumber) => dispatch({ type: 'DUIT::PHONE_VERIFICATION::SUCCESS', userPhoneNumber })
    };
};

export default connect(null, mapDispatchToProps)(OTPVerificationScreen);