import config from '../../config/api.config';

/**
 * @name GlobalActionCreator.js
 */

const { duitServerUrl } = config;

export const createDuitUserHandler = (duitUserData) => {

    let body = new FormData();

    for(let key in duitUserData) {

        body.append(key, duitUserData[key]);
    }

    let requestConfig = {
        
        method: 'POST',
        body
    };

    return dispatch => {

        fetch(`${duitServerUrl}/api/v1/users/create/`, requestConfig)
        .then(response => response.json())
        .then(response => {
            let { pre_registered } = response;

            /** If User is already registered */

            if(pre_registered) {

                alert('[Server]: User is already registered.');
                dispatch({ type: 'EditDuitProfileScreen->CreateUser::Success' });
                return;
            }

            alert('[Server]: Saved to server');
            dispatch({ type: 'EditDuitProfileScreen->CreateUser::Success' });

        }).catch(error => dispatch({ type: 'EditDuitProfileScreen->CreateUser::Failed', error }));

        
    };
};

export const createDuitUserCardHandler = (duitUserCard) => {

    let body = new FormData();

    for (let key in duitUserCard) {

        body.append(key, duitUserCard[key]);
    }

    let requestConfig = {

        method: 'POST',
        body
    };
    
    return dispatch => {

        fetch(`${duitServerUrl}/api/v1/user/userprofile/`, requestConfig)
            .then(response => response.json())
            .then(response => {

                alert('[Server]: Saved Card to the server');
                dispatch({ type: 'AddCardScreen->CreateUserCard::Success' });

            }).catch(error => dispatch({ type: 'AddCardScreen->CreateUserCard::Failed', error }));
    };
};