import React from 'react';
import TouchableBounce from 'react-native/Libraries/Components/Touchable/TouchableBounce';

class TouchableBounceButton extends React.Component {

    constructor(props) { 
        
        super(props);
    };

    _touchableButtonHandler = async (onPressFunction) => {

        setTimeout(() => { onPressFunction(); }, 200, this);
    };

    render() {

        let { onPress, children } = this.props;

        return (

            <TouchableBounce {...this.props} onPress={() => this._touchableButtonHandler(onPress)}>

                <React.Fragment>

                    {children}

                </React.Fragment>

            </TouchableBounce>
        );
    };
};

export default TouchableBounceButton;