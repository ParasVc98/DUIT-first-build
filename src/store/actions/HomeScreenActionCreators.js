/**
 * @name HomeScreenActionCreators.js
 */

export const textValueChangedHandler = (fieldKey, textValue) => {

    return {

        type: 'HomeScreen->TextInput::Changed',
        fieldKey, textValue
    };
};

export const editCardDataHandler = (currentCard) => {

    return {
        type: 'AddScreen->CardData::Edit',
        currentCard
    };
};

export const updateImagesDataHandler = (pickedImageData) => {

    return {

        type: 'AddScreen->ImageData::Update',
        pickedImageData
    };
};

export const saveCardDataHandler = () => {

    return {

        type: 'AddScreen->CardData::Save'
    };
};

export const saveEditedCardDataHandler = (updatedCards) => {

    return {

        type: 'AddScreen->CardData::Save_Edit',
        updatedCards
    };
};

export const deleteCardHandler = (uniqueCardKey) => {


    return dispatch => {

        setTimeout(() => {

            dispatch({

                type: 'CardViewScreen->CardData::Delete',
                uniqueCardKey
            });

        }, 1000);

    };
};

export const resetFormDataHandler = () => {

    return {

        type: 'AddScreen->CardData::Reset'
    };
};