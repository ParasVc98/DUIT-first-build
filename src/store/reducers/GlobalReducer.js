const initialState = {

    userPhoneNumber: null,
    isVerified: false
};

const GlobalReducer = (state = initialState, action) => {

    switch (action.type) {

        case 'DUIT::PHONE_VERIFICATION::SUCCESS':

            let { userPhoneNumber } = action;
    
            return {

                ...state,
                userPhoneNumber,
                isVerified: true
            };

        case 'EditDuitProfileScreen->CreateUser::Success':
            
            return {

                ...state
            };
        case 'EditDuitProfileScreen->CreateUser::Failed':

            return {

                ...state
            };

        case 'AddCardScreen->CreateUserCard::Success':

            return {

                ...state
            };
        
        case 'AddCardScreen->CreateUserCard::Failed':

            return {

                ...state
            };

        case 'DUIT::APP::LOGOUT':

            return {

                ...initialState
            };

        default:
            return state;
    };
};

export default GlobalReducer;