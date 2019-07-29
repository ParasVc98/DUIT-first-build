import React from 'react';
import { CheckBox } from 'react-native-elements';
import TouchableBounceButton from '../buttons/TouchableBounceButton';
import { calculateFontSizeByPlatform, lightFontStyles } from '../../../styles/AppStyle';
/**
 * @name CheckBoxCustom.js
 * @type { function (Stateless React Component) }
 * @returns { ReactNode }
 * @description This function contains the checkbox component.
 */

const CheckBoxCustom = (props) => {

    let { label,
          iconSize,
          iconType,
          onPress,
          isChecked,
          checkedIcon, 
          uncheckedIcon, 
          checkedColor,
          uncheckedColor, 
          containerStyle } = props;

    return (
            <CheckBox
                component={TouchableBounceButton}
                title={label}
                iconLeft
                size={iconSize || 28}
                iconType={iconType}
                checkedIcon={checkedIcon}
                uncheckedIcon={uncheckedIcon}
                checkedColor={checkedColor || 'green'}
                uncheckedColor={uncheckedColor || 'firebrick'}
                containerStyle={{

                    flex: 1,                    
                    margin: 0,
                    marginLeft: 0,
                    width: '100%',
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                    ...containerStyle
                }}
                textStyle={{

                    fontSize: calculateFontSizeByPlatform(2.50),
                    color: '#000',
                    fontWeight: '200',
                    ...lightFontStyles
                }}
                onPress={onPress}
                checked={isChecked}
            />
    );
};

export default CheckBoxCustom;