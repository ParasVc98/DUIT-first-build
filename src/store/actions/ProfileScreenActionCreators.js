/**
 * @name ProfileScreenActionCreators.js
 */

export const textValueChangedHandler = (fieldKey, textValue) => {

    return {

        type: 'ProfileEditScreen->TextInput::Changed',
        fieldKey, textValue
    };
};

export const profileImageChangedHandler = (imageURI) => {

    return {

        type: 'ProfileEditScreen->ProfileImage::Changed',
        imageURI
    };
};