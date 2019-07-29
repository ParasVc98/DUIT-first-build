import * as FormValidator from '../../utils/FormValidator';
import dateFormat from 'dateformat';

const initialState = {

    userName: '',
    userDesignation: '',
    userCompany: '',
    profileAvatar: '',
    userNameField: {

        value: '',
        isValid: true,
        errorMessage: 'Name cannot be blank'
    },
    phoneNumberField: {

        value: '+91 - ',
        isValid: true,
        errorMessage: 'phone no field cannot be blank'
    },
    messageField: {

        value: `Hi, I am ________. We met on ${dateFormat(new Date(), 'dddd, mmmm dS, yyyy')}.`,
        isValid: true,
        errorMessage: 'Message cannot be blank'
    },
    selectedCard: 'please select a card',
    isCardPicked: false,
    includeLocation: false,
    addToPhoneBook: false,
    isLocationFetched: false,
    shareViaWhatsapp: true, 
    locationData: {

        latitude: null,
        longitude: null,
        address: {}
    }
};

const SendScreenReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'SendScreen->CardPicker::Changed':

            let { pickedValue, pickedCard } = action;

            return {

                ...state,
                userName: pickedCard.userNameField.value,
                userDesignation: pickedCard.designationField.value,
                userCompany: pickedCard.companyNameField.value,
                profileAvatar: pickedCard.userImages[0],
                messageField: { ...state.messageField, value: `Hi, I am ${pickedCard.userNameField.value}. We met on ${dateFormat(new Date(), 'dddd, mmmm dS, yyyy')}.` },                
                selectedCard: pickedValue,
                isCardPicked: true
            };

        case 'SendScreen->TextInput::Changed':

            let { fieldKey, textValue } = action;

            return {

                ...state,
                [fieldKey]: {
                    ...state[fieldKey],
                    value: textValue,
                    isValid: !FormValidator.isFieldBlank(textValue)
                }
            };
        case 'SendScreen->CheckBox::Changed':
            
            let { checkBoxKey } = action;

            return {

                ...state,
                [checkBoxKey]: !state[checkBoxKey]
            };


        case 'SendScreen->UserCard::Share_Card':

            let { userCard: { userNameField, designationField, companyNameField, userImages }} = action;

            return {

                ...state,
                userName: userNameField.value,
                userDesignation: designationField.value,
                userCompany: companyNameField.value,
                profileAvatar: userImages[0],
                messageField: { ...state.messageField, value: `Hi, I am ${userNameField.value}. We met on ${dateFormat(new Date(), 'dddd, mmmm dS, yyyy')}.`},
                selectedCard: designationField.value,
                isCardPicked: true
            };
        
        case 'CardViewScreen->CardData::Delete':
    
            return {

                ...state,
                userName: initialState.userName,
                profileAvatar: initialState.profileAvatar,
                messageField: { ...state.messageField, value: initialState.messageField.value },
                selectedCard: initialState.selectedCard,
                isCardPicked: false
            };

        case 'SendScreen->Location_Data_Fetch::Success':

            let { locationData } = action;

            return {

                ...state,
                locationData: {

                    ...state.locationData,
                    ...locationData
                },
                includeLocation: true,
                isLocationFetched: true,

            };
        
        case 'SendScreen->Location_Data_Fetch::Failed':

            return {

                ...state,
                isLocationFetched: false
            };

        case 'DUIT::APP::LOGOUT':

            return {

                ...initialState
            };

        default:
            return state;
    };
};

export default SendScreenReducer;