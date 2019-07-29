import React from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { responsiveWidth,responsiveHeight } from 'react-native-responsive-dimensions';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../../styles/AppStyle';

const { height, width } = Dimensions.get('window');
const { lightGrey5, errorRed } = AppStyle;


/**
 * @name FormInputCustom.js
 * @type { function (Stateless React Component) }
 * @returns { ReactNode }
 * @description This function contains the form input component.
 */


const FormInputCustom = (props) => {

    let { label,
          value,
          editable,
          multiline,
          maxLength,
          hasError,
          errorText,
          keyboardType,
          onChangeText,
          textInputStyle,
          containerStyle } = props;


    return (
        <View style={{ backgroundColor: 'transparent', ...containerStyle }}>

            <FormLabel 
                containerStyle={{  }}
                fontFamily={lightFontStyles['fontFamily']}
                labelStyle={{

                    color: lightGrey5,
                    fontSize: calculateFontSizeByPlatform(2.15),
                    fontWeight: '300'
                }}>{label}</FormLabel>

            <FormInput            
                multiline={multiline || false}
                autoCapitalize={'none'}
                autoCorrect={false}
                secureTextEntry={false}
                editable={ editable && true }
                keyboardType={keyboardType ? keyboardType : 'default'}
                placeholderTextColor={'rgba(0, 0, 0, 0.6)'}
                placeholder={''}
                maxLength={maxLength || 50}
                underlineColorAndroid={'transparent'}
                value={value}
                inputStyle={{

                    fontSize: calculateFontSizeByPlatform(2.2),                    
                    textAlign: 'left',
                    color: editable === false ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 1.0)',
                    width: width * 0.90,
                    ...textInputStyle,
                    ...lightFontStyles
                }}
                containerStyle={{
                    borderBottomWidth: 1.25,
                    marginLeft: Platform.OS === 'ios' ? responsiveWidth(5.8) : responsiveWidth(5.8),
                    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
                }}
                onChangeText={onChangeText} />

            {
                hasError ? (

                    <FormValidationMessage labelStyle={{ color: errorRed, ...lightFontStyles }}>
                        {errorText}
                    </FormValidationMessage>
                ) : null
            }
            
        </View> 
    );
};

export default FormInputCustom;