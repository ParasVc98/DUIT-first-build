import config from '../../config/api.config';
const {duitServerUrl} = config;

/**
 * @name SendScreenActionCreators.js
 */

export const cardPickerValueChangedHandler = ({ pickedValue, pickedCard }) => {

    return {

        type: 'SendScreen->CardPicker::Changed',
        pickedValue, pickedCard
    };
};

export const textValueChangedHandler = (fieldKey, textValue) => {

    return {

        type: 'SendScreen->TextInput::Changed',
        fieldKey, textValue
    };
};

export const checkBoxValueChangedHandler = (checkBoxKey) => {

    return {

        type: 'SendScreen->CheckBox::Changed',
        checkBoxKey
    };
};

export const shareUserProfileHandler = (recipientData) => {

    let data = new FormData();

    for (let key in recipientData) {
        data.append(key, recipientData[key]);
    }

    let requestConfig = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Token 97a74c03004e7d6b0658dfdfde34fd6aa4b14ddb'
        },
        body: data
    };

    return dispatch => {

        fetch(`${duitServerUrl}/api/v1/user/meeting/new/`,requestConfig)
        .then(response => response.json())
        .then(response => {
            //alert('Response: '+response.rec_name)
            dispatch({
                type: 'SendScreen->UserCard::Share_Card',
                // userCard
            })
        })
        .catch(error => {
            // alert('API error ' + error) 
            alert('Connection Error @SendScreenActionCreators');
        });
    }
};

export const fetchLocationDataHandler = (latitude, longitude, locationPinAnimationRef, locationTextAnimationRef) => {

    let API_KEY = config.locationIQApiKey;

    return dispatch => {

        fetch(`https://eu1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`)
        .then(response => response.json())
        .then(async response => {

            let { place_id, lat, lon, address, boundingbox, display_name } = response;
            
            let locationData = {

                place_id,
                latitude: lat,
                longitude: lon,
                displayName: display_name,
                address, boundingbox
            };
            
            dispatch({
                type: 'SendScreen->Location_Data_Fetch::Success',
                locationData
            });
            
            await locationTextAnimationRef.fadeIn();
            await locationPinAnimationRef.pulse();

        }).catch(error => dispatch({ type: 'SendScreen->Location_Data_Fetch::Failed', error }));
    };
};
