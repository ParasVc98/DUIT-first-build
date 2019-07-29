import * as FormValidator from '../../utils/FormValidator';

const initialState = {

    profileImage: { isImagePicked: false, uri: 'http://s3.amazonaws.com/nvest/Blank_Club_Website_Avatar_Gray.jpg' },
    firstNameField: {

        value: '',
        isValid: true,
        errorMessage: 'First name cannot be blank'
    },
    lastNameField: {

        value: '',
        isValid: true,
        errorMessage: 'Last name cannot be blank'
    },
    emailIdField: {

        value: '',
        isValid: true,
        errorMessage: 'Email cannot be blank'
    }
};

const ProfileScreenReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'ProfileEditScreen->TextInput::Changed':

            let { fieldKey, textValue } = action;

            return {

                ...state,
                [fieldKey]: {
                    ...state[fieldKey],
                    value: textValue,
                    isValid: !FormValidator.isFieldBlank(textValue)
                }
            };
        
        case 'ProfileEditScreen->ProfileImage::Changed':

            let { imageURI } = action;

            return {

                ...state,
                profileImage: { isImagePicked: true, uri: imageURI }
            };

        case 'DUIT::APP::LOGOUT':

            return {

                ...initialState
        };

        default:
            return state;
    };
};

export default ProfileScreenReducer;