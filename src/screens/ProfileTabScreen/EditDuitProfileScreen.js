import React, { Component } from 'react';
import { 
    View,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import DropdownAlert from 'react-native-dropdownalert';
import DropDownAlertStyles from '../../styles/DropDownAlertStyles';
import ImagePickerDialog from '../../components/layout/dialogs/ImagePickerDialog';
import FormInputCustom from '../../components/layout/inputs/FormInputCustom';
import ScreenHeaderExtended from '../../components/layout/headers/ScreenHeaderExtended';
import TouchableBounceButton from '../../components/layout/buttons/TouchableBounceButton';
import ProgressiveImage from 'react-native-image-progress';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../styles/AppStyle';
import { textValueChangedHandler, profileImageChangedHandler } from '../../store/actions/ProfileScreenActionCreators';
import { createDuitUserHandler } from '../../store/actions/GlobalActionCreators';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import {  ImageDataRetriever, getImageUriByPlatform } from '../../utils/ImagePickerUtils';


const { primaryBackgroundColor, primaryThemeColor } = AppStyle;


/**
 * @name EditDuitProfileScreen.js
 * @type { class }
 * @description  This class contains the root component used to
 *               render the EditDuitProfileScreen. This screen is
 *               used to create a default duit user.
 */

class EditDuitProfileScreen extends Component {

    constructor(props) {

        super(props);
        this.state = {

            isOptionPickerDisplayed: false,
            isSaveChangesDialogDisplayed: false
        };
    };

    _textChanged = (fieldKey, textValue) => this.props.textValueChanged(fieldKey, textValue);

    _toggleOptionPicker = () => {

        this.setState({

            ...this.state,
            isOptionPickerDisplayed: !this.state.isOptionPickerDisplayed
        });
    };

     /**
     * @type { function }
     * @param { String } optionKey
     * @description Local method that picks the image from the user device
     *              based on the optionKey which specifies to pick image from
     *              user's library or camera.
     */

    _pickImageAsync = async (optionKey) => {    

        ImageDataRetriever(this._toggleOptionPicker, optionKey, this._processImage);
    };

    /**
     * @type { function }
     * @param { Object } imageData
     * @returns { void }
     * @description Local method to process the image data as per this component.
     */

    _processImage = (imageData) => {

        let { didCancel } = imageData;

        if(didCancel) return null;
        alert(getImageUriByPlatform(imageData));
        this.props.profileImageChanged(getImageUriByPlatform(imageData));
    };

    _navigateToApp = () => {

        let { navigate } = this.props.navigation;
        let { from_screen } = this.props.navigation.state.params;
        
        if (from_screen === 'ProfileTabScreen') navigate('ProfileTabScreen');         
        if(from_screen === 'OTPVerificationScreen') navigate('HomeTabScreen');

    };

    _saveDetails = () => {
    
        let { userPhoneNumber } = this.props.globalData;
        let { profileImage: { uri }, firstNameField, lastNameField, emailIdField } = this.props.profileScreenData;

        if((firstNameField.value === '') || (lastNameField.value === '') || (emailIdField.value === '')) {

            this.dropDownNotification.alertWithType('error', 'Invalid Details', 'Please provide valid details');            
            
            return;
        }

        /**
         * Calling the API to push the user detail's to the server.
        */
        let fullPhoneNumber = userPhoneNumber.split('-');
        let imageType = uri.split('.')[uri.split('.').length - 1];

        this.props.createDuitUser({
            
            'first_name': firstNameField.value,
            'last_name': lastNameField.value,
            'email': emailIdField.value,
            'mobile_country_code': fullPhoneNumber[0],
            'mobile_number': fullPhoneNumber[1],
            'profile_photo': { uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
                               type: `image/${imageType}`,
                               name: `profile_photo.${imageType}`   
                             }
        });

        this._navigateToApp();
    };

    render() {

        let { userPhoneNumber } = this.props.globalData;
        let { profileImage, firstNameField, lastNameField, emailIdField } = this.props.profileScreenData;
        let { from_screen } = this.props.navigation.state.params;
        let { navigate } = this.props.navigation;

        return (
            <KeyboardAvoidingView enabled behavior={'padding'} style={styles.container}>

                <ScrollView contentContainerStyle={{ backgroundColor: primaryBackgroundColor }}>

                    <ScreenHeaderExtended title={'Edit Profile'} onPress={() => from_screen === 'ProfileTabScreen' ? navigate('ProfileTabScreen') : undefined} onPressSecondary={() => this._saveDetails()} />

                    <TouchableBounceButton onPress={() => this._toggleOptionPicker()} style={{ flex: 1, marginVertical: responsiveHeight(2), alignSelf: 'center', justifyContent: 'center', height: responsiveHeight(32.00), width: responsiveWidth(40), borderRadius: 5, marginRight: 4 }}>

                        {
                            !profileImage.isImagePicked ? (

                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: primaryThemeColor }}>
                                    <SimpleLineIcons name={'plus'} size={calculateFontSizeByPlatform(4.80)} style={{ color: '#FFF' }} />
                                </View>

                            ) : (

                                <ProgressiveImage
                                    source={{ uri: profileImage.uri }}
                                    imageStyle={{ borderRadius: 5 }}
                                    style={{

                                        borderRadius: 5,
                                        backgroundColor: '#F0F0F0',
                                        width: '100%',
                                        height: '100%',
                                    }} />
                                )
                        }


                    </TouchableBounceButton>

                    <View style={{ backgroundColor: 'transparent', padding: 2 }}>

                        <FormInputCustom onChangeText={(textValue) => this._textChanged('firstNameField', textValue)}
                            label={'First Name'} hasError={!firstNameField.isValid}
                            errorText={firstNameField.errorMessage}
                            value={firstNameField.value} />

                        <FormInputCustom onChangeText={(textValue) => this._textChanged('lastNameField', textValue)}
                            label={'Last Name'} hasError={!lastNameField.isValid}
                            errorText={lastNameField.errorMessage}
                            value={lastNameField.value} />

                        <FormInputCustom onChangeText={(textValue) => this._textChanged('phoneNumberField', textValue)}
                            label={'Phone Number'} hasError={false} editable={false}
                            value={userPhoneNumber} />

                        <FormInputCustom onChangeText={(textValue) => this._textChanged('emailIdField', textValue)}
                            keyboardType={'email-address'} label={'Email ID'} hasError={!emailIdField.isValid}
                            errorText={emailIdField.errorMessage}
                            value={emailIdField.value} />                    
                    </View>

                </ScrollView>

                <ImagePickerDialog 
                    isVisible={this.state.isOptionPickerDisplayed}
                    toggleOptionPicker={this._toggleOptionPicker}
                    pickFromCamera={() => this._pickImageAsync('from_camera')}
                    pickFromLibrary={() => this._pickImageAsync('from_library')}
                />

                <DropdownAlert { ...DropDownAlertStyles } ref={ref => this.dropDownNotification = ref} />                                                
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: primaryBackgroundColor
    }
});

const mapStateToProps = (state) => {

    return {

        globalData: state.globalData,
        profileScreenData: state.profileScreenData
    };
};

const mapDispatchToProps = (dispatch) => {

    return {

        textValueChanged: (fieldKey, textValue) => dispatch(textValueChangedHandler(fieldKey, textValue)),
        profileImageChanged: (imageURI) => dispatch(profileImageChangedHandler(imageURI)),
        createDuitUser: (duitUserData) => dispatch(createDuitUserHandler(duitUserData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDuitProfileScreen);