import * as FormValidator from '../../utils/FormValidator';
import { generateUUID } from '../../utils/UUIDGenerator';

const initialState = {

    addCardFormData: {

        uniqueCardKey: undefined,
        userImages: [],
        userNameField: {

            value: '',
            isValid: true,
            errorMessage: 'Name cannot be blank'
        },
        phoneNumberField: {

            value: '+91 - xxxxxxxx'
        },
        designationField: {

            value: '',
            isValid: true,
            errorMessage: 'Designation cannot be blank'
        },
        companyNameField: {

            value: '',
            isValid: true,
            errorMessage: 'Company name cannot be blank'
        },
        emailIdField: {

            value: '',
            isValid: true,
            errorMessage: 'Email cannot be blank'
        },
        companyWebsiteField: {

            value: '',
            isValid: true,
            errorMessage: 'Company Email cannot be blank'
        },
        aboutField: {

            value: '',
            isValid: true,
            errorMessage: 'About field cannot be blank'
        }
    },

    
    userCards: []
};

const HomeScreenReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'HomeScreen->TextInput::Changed':

            let { fieldKey, textValue } = action;
            
            return {

                ...state,
                addCardFormData: {

                    ...state.addCardFormData,
                    [fieldKey]: {

                        ...state.addCardFormData[fieldKey],
                        value: textValue,
                        isValid: !FormValidator.isFieldBlank(textValue)
                    }
                }
            };

        case 'AddScreen->ImageData::Update':

            let { pickedImageData } = action;

            return {

                ...state,
                addCardFormData: {

                    ...state.addCardFormData,
                    userImages: pickedImageData
                }
            };
        
        case 'AddScreen->CardData::Save':

            let newCardData = {...state.addCardFormData};
                newCardData.uniqueCardKey = generateUUID();

            let userCards = [...state.userCards];
                userCards.unshift(newCardData);

            return {

                ...state,
                userCards 
            };
        
        case 'AddScreen->CardData::Save_Edit':

            let { updatedCards } = action;

            return {
                ...state,
                userCards: [...updatedCards]
            };

        case 'AddScreen->CardData::Edit':

            let { currentCard } = action;

            return {

                ...state,
                addCardFormData: currentCard
            };

        case 'CardViewScreen->CardData::Delete':
        
            let { uniqueCardKey } = action;
        
            let updatedUserCards = state.userCards.filter(card => {

                    if(card.uniqueCardKey === uniqueCardKey) return false;
                              
                    return true;
            });

            return {

                ...state,
                userCards: [...updatedUserCards]
            };

        case 'AddScreen->CardData::Reset':

            return {

                ...state,
                addCardFormData: initialState.addCardFormData  
            };
        
        case 'DUIT::APP::LOGOUT':

            return {

                ...initialState
            };

        default:
            return state;
    };
};

export default HomeScreenReducer;