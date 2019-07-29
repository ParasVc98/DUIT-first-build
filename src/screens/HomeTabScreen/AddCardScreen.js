import React, { Component } from 'react';
import { 
    View,
    ScrollView,
    Platform,
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { DotsLoader } from 'react-native-indicator';
import DropdownAlert from 'react-native-dropdownalert';
import DropDownAlertStyles from '../../styles/DropDownAlertStyles';
import ProgressiveImage from 'react-native-image-progress';
import TouchableBounceButton from '../../components/layout/buttons/TouchableBounceButton';
import ImagePickerDialog from '../../components/layout/dialogs/ImagePickerDialog';
import ScreenHeaderExtended from '../../components/layout/headers/ScreenHeaderExtended';
import FormInputCustom from '../../components/layout/inputs/FormInputCustom';
import { textValueChangedHandler,
         updateImagesDataHandler,
         saveCardDataHandler,
         saveEditedCardDataHandler,
         editCardDataHandler,
         resetFormDataHandler } from '../../store/actions/HomeScreenActionCreators';
import { createDuitUserCardHandler } from '../../store/actions/GlobalActionCreators';
import AskUserModal from '../../components/layout/dialogs/AskUserModal';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import AppStyle from '../../styles/AppStyle';
import { ImageDataRetriever, getImageUriByPlatform } from '../../utils/ImagePickerUtils';

const { primaryThemeColor, primaryBackgroundColor, lightGrey2, lightGrey4 } = AppStyle;

/**
 * @name AddCardScreen.js
 * @type { class }
 * @description This class contains the root component used to
 *              render the AddCardScreen.
 */

class AddCardScreen extends Component {

    constructor(props) {

        super(props);
        this.state = {

            contextKey: undefined,
            imageData: {

                primaryImage: { isImagePicked: false, uri: undefined },
                secondaryImage1: { isImagePicked: false, uri: undefined },
                secondaryImage2: { isImagePicked: false, uri: undefined },
                secondaryImage3: { isImagePicked: false, uri: undefined },
                secondaryImage4: { isImagePicked: false, uri: undefined }
            },
            
            isOptionPickerDisplayed: false,
            isSaveChangesDialogDisplayed: false
        };

        /**
         * Note:
         * This is a listener added to this screen which when the screen is out
         * of focus or didBlur, form data will reset to default.
         */

        this.props.navigation.addListener('didBlur', () => this._resetFormData());
    };

    componentWillMount() {

        /**
         * Note:
         * In ComponentWillMount the action type will be checked meaning,
         * AddCardScreen will check if it's opened in edit card mode or add
         * card mode as this screen functions as both based of the params
         * provided by the last navigation route.
         */

        let { imageData } = this.state;
        let { actionType, cardData } = this.props.navigation.state.params;
        let currentCardImages = {};

        if (actionType === 'edit-card') {

            this.props.editCardData(cardData);

            for (let key in imageData) {

                    let value = imageData[key];
                    let index = Object.keys(imageData).indexOf(key);

                    if (cardData.userImages[index] === undefined) {

                        currentCardImages[key] = { ...value, isImagePicked: false, uri: undefined }

                    } else {

                        currentCardImages[key] = { ...value, isImagePicked: true, uri: cardData.userImages[index] }
                    }

            }

            this.setState({ ...this.state, imageData: currentCardImages });
        }
    };


     /**
     * @type { function }
     * @param { String } fieldKey
     * @param { String } textValue
     * @description Local method which dispatches the redux action to update
     *              the text valued in a particular field based on the fieldkey
     *              provided.
     */

    _textChanged = (fieldKey, textValue) => this.props.textValueChanged(fieldKey, textValue);


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
        let { contextKey } = this.state;

        if (didCancel) return null;       

        this.setState({ ...this.state, imageData: {
            ...this.state.imageData,
            [contextKey]: { ...this.state.imageData[contextKey], isImagePicked: true, uri: getImageUriByPlatform(imageData) }
        }}, () => this._updateImageData());
    };

    /**
     * @type { function }
     * @param { none }
     * @returns { void }
     * @description Local method that toggles the cardPicker.
     */

    _toggleOptionPicker = () => {

        this.setState({

            ...this.state,
            isOptionPickerDisplayed: !this.state.isOptionPickerDisplayed
        });
    };


    /**
     * @type { function }
     * @param { String } contextKey
     * @returns { void }
     * @description Local method sets the contextKey (current image field) and
     *              toggles the image picker option dialog.
     */

    _pickImageWithContext = (contextKey) => {

        this.setState({ ...this.state, contextKey }, () => this._toggleOptionPicker());
    };


    /**
     * @type { function }
     * @param { none }
     * @returns { void }
     * @description Local method that updated the image fields if the this
     *              screen is used to edit the card.
     */

    _updateImageData = () => {

        let imageUriDataArray = [];

        Object.keys(this.state.imageData).forEach(imageDataKey => {

            let { uri: imageUri } = this.state.imageData[imageDataKey];

            if(imageUri !== undefined) imageUriDataArray.push(imageUri);
        });

        this.props.updateImagesData(imageUriDataArray);
    };


     /**
     * @type { function }
     * @param { Object } state
     * @returns { Boolean }
     * @description Local method that validates the AddCardScreen form.
     */

    _isFormValid = (state) => {

        let { userImages, userNameField: userName,
                          designationField: designation,
                          companyNameField: companyName,
                          emailIdField: emailId,
                          companyWebsiteField: companyWebsite,
                          aboutField: about } = state.addCardFormData;

        return userImages.length && userName.isValid && designation.isValid && companyName.isValid && emailId.isValid && companyWebsite.isValid && about.isValid;
    };


    /**
     * @type { function }
     * @param { none }
     * @returns { void }
     * @description Local method that checks the validation and dispatches
     *              a save card action to save the card in redux
     *              store.
     */

    _saveCardData = () => {

        if (!this._isFormValid(this.props.homeScreenData)) {

            this.dropDownNotification.alertWithType('warn', 'Warning', 'Please complete all the details.');

            return;
        }

        /**
         * Dispatch server sync method
         */

        let { addCardFormData: { 
                userNameField,
                phoneNumberField,
                designationField,
                companyNameField,
                emailIdField,
                companyWebsiteField,
                aboutField } } = this.props.homeScreenData;

        let { imageData: { primaryImage: { uri } } } = this.state;

        let imageType = uri.split('.')[uri.split('.').length - 1];

        this.props.createDuitUserCard({

            'first_name': userNameField.value,
            'last_name': ' ',
            'designation': designationField.value,
            'company': companyNameField.value,
            'description': aboutField.value,
            'profile_photo': {

                uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
                type: `image/${imageType}`,
                name: `profile_photo.${imageType}`
            }
        });

        this.props.saveCardData();
        this.props.navigation.goBack();
    };


      /**
     * @type { function }
     * @param { none }
     * @returns { void }
     * @description Local method that checks the validation and dispatches
     *              a save card action to save the updated card in redux
     *              store.
     */

    _saveEditedCard = () => {

        if (!this._isFormValid(this.props.homeScreenData)) {

            this.dropDownNotification.alertWithType('warn', 'Warning', 'Please complete all the details.');

            return;
        }

        let { addCardFormData, userCards } = this.props.homeScreenData;
        let { cardData } = this.props.navigation.state.params;

        let updatedCards = userCards.slice();

        updatedCards.forEach((card, index) => {


            if (cardData.uniqueCardKey === card.uniqueCardKey) {

                updatedCardIndex = index;
                updatedCards[index] = { ...addCardFormData };
            }
        });

        this.props.saveEditedCardData(updatedCards);
        this.props.navigation.goBack();
    };


    /**
     * @type { function }
     * @param { none }
     * @returns { void }
     * @description Local method that toggles the save changes dialog.
     */

    _toggleSaveChangesDialog = () => {

        this.setState({

            isSaveChangesDialogDisplayed: !this.state.isSaveChangesDialogDisplayed
        });
    };


      /**
     * @type { function }
     * @param { none }
     * @returns { void }
     * @description Local method which dispatches reset form data action to
     *              reset the add card form to it's original state.
     */

    _resetFormData = () => this.props.resetFormData();

    render() {

        let { goBack } = this.props.navigation;
        let { headerTitle, actionType } = this.props.navigation.state.params;

        let { addCardFormData: { userNameField,
                                 phoneNumberField,
                                 designationField,
                                 companyNameField,
                                 emailIdField,
                                 companyWebsiteField,
                                 aboutField } } = this.props.homeScreenData;
        

        let { primaryImage, secondaryImage1,
                            secondaryImage2,
                            secondaryImage3,
                            secondaryImage4 } = this.state.imageData;

        return (
            <KeyboardAvoidingView enabled behavior={'padding'} style={styles.container}>

                <ScrollView contentContainerStyle={{ /*paddingTop: Constants.statusBarHeight,*/ backgroundColor: primaryBackgroundColor }}>

                    <ScreenHeaderExtended title={headerTitle} onPress={() => this._toggleSaveChangesDialog()} onPressSecondary={ actionType === 'edit-card' ? () => this._saveEditedCard() : () => this._saveCardData()}  />
                    
                    <View style={{ flexDirection: 'row', backgroundColor: 'transparent', height: responsiveHeight(40), padding: 16 }}>

                        <TouchableBounceButton onPress={() => this._pickImageWithContext('primaryImage')} style={{ flex: 1, borderRadius: 5, marginRight: 4 }}>

                                {
                                    !primaryImage.isImagePicked ? (

                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: primaryThemeColor }}>
                                            <SimpleLineIcons name={'plus'} size={44} style={{ color: '#FFF' }} />
                                        </View>

                                    ) : (

                                        <ProgressiveImage
                                            source={{ uri: primaryImage.uri }}
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

                        <View style={{ flex: 1, backgroundColor: 'transparent', marginLeft: 4 }}>

                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent'}}>
                                <TouchableBounceButton onPress={() => this._pickImageWithContext('secondaryImage1')} style={{ flex: 1, borderRadius: 5, marginRight: 4, marginBottom: 4 }}>
                                    {
                                        !secondaryImage1.isImagePicked ? (

                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: primaryThemeColor }}>
                                                <SimpleLineIcons name={'plus'} size={24} style={{ color: '#FFF' }} />
                                            </View>

                                        ) : (

                                                <ProgressiveImage
                                                    source={{ uri: secondaryImage1.uri }}
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

                                <TouchableBounceButton onPress={() => this._pickImageWithContext('secondaryImage2')} style={{ flex: 1, borderRadius: 5, marginLeft: 4, marginBottom: 4 }}>
                                    {
                                        !secondaryImage2.isImagePicked ? (

                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: primaryThemeColor }}>
                                                <SimpleLineIcons name={'plus'} size={24} style={{ color: '#FFF' }} />
                                            </View>

                                        ) : (

                                                <ProgressiveImage
                                                    source={{ uri: secondaryImage2.uri }}
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
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'transparent'}}>
                                <TouchableBounceButton onPress={() => this._pickImageWithContext('secondaryImage3')} style={{ flex: 1, borderRadius: 5, marginRight: 4, marginTop: 4 }}>
                                    {
                                        !secondaryImage3.isImagePicked ? (

                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: primaryThemeColor }}>
                                                <SimpleLineIcons name={'plus'} size={24} style={{ color: '#FFF' }} />
                                            </View>

                                        ) : (

                                                <ProgressiveImage
                                                    source={{ uri: secondaryImage3.uri }}
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

                                <TouchableBounceButton onPress={() => this._pickImageWithContext('secondaryImage4')} style={{ flex: 1, borderRadius: 5, marginLeft: 4, marginTop: 4 }}>
                                    {
                                        !secondaryImage4.isImagePicked ? (

                                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 5, backgroundColor: primaryThemeColor }}>
                                                <SimpleLineIcons name={'plus'} size={24} style={{ color: '#FFF' }} />
                                            </View>

                                        ) : (

                                                <ProgressiveImage
                                                    source={{ uri: secondaryImage4.uri }}
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
                            </View>

                        </View>
                    </View>

                    <View style={{ backgroundColor: 'transparent' }}>
                    
                        <FormInputCustom onChangeText={(textValue) => this._textChanged('userNameField', textValue)}
                            label={'Name'} hasError={!userNameField.isValid}
                            errorText={userNameField.errorMessage}
                            value={userNameField.value} />

                        <FormInputCustom onChangeText={(textValue) => this._textChanged('phoneNumberField', textValue)}
                            label={'Phone Number'} hasError={false} editable={false}
                            value={this.props.globalData.userPhoneNumber} />

                        <FormInputCustom onChangeText={(textValue) => this._textChanged('designationField', textValue)}
                            label={'Designation'} hasError={!designationField.isValid}
                            errorText={designationField.errorMessage}
                            value={designationField.value} />

                        <FormInputCustom onChangeText={(textValue) => this._textChanged('companyNameField', textValue)}
                            label={'Company Name'} hasError={!companyNameField.isValid}
                            errorText={companyNameField.errorMessage}
                            value={companyNameField.value} />

                        <FormInputCustom onChangeText={(textValue) => this._textChanged('emailIdField', textValue)}
                            keyboardType={'email-address'} label={'Email ID'} hasError={!emailIdField.isValid}
                            errorText={emailIdField.errorMessage}
                            value={emailIdField.value} />

                        <FormInputCustom onChangeText={(textValue) => this._textChanged('companyWebsiteField', textValue)}
                            label={'Company Website'} hasError={!companyWebsiteField.isValid}
                            errorText={companyWebsiteField.errorMessage}
                            value={companyWebsiteField.value} />

                        <FormInputCustom onChangeText={(textValue) => this._textChanged('aboutField', textValue)}
                            label={'About'} hasError={!aboutField.isValid}
                            errorText={aboutField.errorMessage}
                            value={aboutField.value} multiline maxLength={400}
                            containerStyle={{ marginBottom: 16 }} />

                    </View>
                </ScrollView>


                <ImagePickerDialog 
                    isVisible={this.state.isOptionPickerDisplayed}
                    toggleOptionPicker={this._toggleOptionPicker}
                    pickFromCamera={() => this._pickImageAsync('from_camera')}
                    pickFromLibrary={() => this._pickImageAsync('from_library')}
                />
                
                <AskUserModal headerContent={'Save Changes'}
                    subContent={'Do you want to save new changes?'}
                    isVisible={this.state.isSaveChangesDialogDisplayed}
                    toggleDialog={this._toggleSaveChangesDialog}
                    successButtonText={'Save'}
                    successButtonTextColor={primaryThemeColor}
                    failureButtonText={'Discard'}
                    failureButtonTextColor={'#FFF'}
                    onSuccess={actionType === 'edit-card' ? () => { this._toggleSaveChangesDialog(); this._saveEditedCard(); } : () => { this._toggleSaveChangesDialog(); this._saveCardData(); }}
                    onFailure={() => { this._toggleSaveChangesDialog(); goBack();}} />

                <DropdownAlert { ...DropDownAlertStyles } ref={ref => this.dropDownNotification = ref} />                                
            </KeyboardAvoidingView>
        );
    };
};

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: primaryBackgroundColor
    }
});

const mapStateToProps = (state) => {

    return {

        globalData: state.globalData,
        homeScreenData: state.homeScreenData
    };
};

const mapDispatchToProps = (dispatch) => {

    return {

        textValueChanged: (fieldKey, textValue) => dispatch(textValueChangedHandler(fieldKey, textValue)),
        updateImagesData: (pickedImageData) => dispatch(updateImagesDataHandler(pickedImageData)),
        saveCardData: () => dispatch(saveCardDataHandler()),
        saveEditedCardData: (updatedCards) => dispatch(saveEditedCardDataHandler(updatedCards)),
        editCardData: (currentCard) => dispatch(editCardDataHandler(currentCard)),
        resetFormData: () => dispatch(resetFormDataHandler()),
        createDuitUserCard: (duitUserCard) => dispatch(createDuitUserCardHandler(duitUserCard))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCardScreen);