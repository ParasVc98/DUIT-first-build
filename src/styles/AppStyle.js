import { Platform } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { webWeights, sanFranciscoWeights, robotoWeights } from 'react-native-typography'
/**
 * @name AppStyle.js
 * @description Contains the global app styles which can be used to theme
 *              the app's fonts and color schemes.
 */

const AppStyle = {
    
    primaryThemeColor: '#003A76', // alt color: #4282EE
    primaryBackgroundColor: '#FAFAFA',
    white : 'white',
    lightGrey0: '#DDDDDD',
    lightGrey1: '#E0E0E0',
    lightGrey2: '#BBC2CC',
    lightGrey3: '#9E9E9E',
    lightGrey4: '#818588',
    lightGrey5: '#4A4A4A',
    errorRed: 'rgba(250, 0, 0, 0.8)',
    screenHeaderColor: '#003A76'

};

export const typography = Platform.OS === 'ios' ? sanFranciscoWeights : robotoWeights;

export const regularFontStyles = { ...typography.thin };
export const lightFontStyles = { ...typography.regular };
export const extraLightFontStyles = { ...typography.thin };

export const calculateFontSizeByPlatform = (size) => responsiveFontSize(size - (Platform.OS === 'ios' ? 0.4 : 0.5))

export default AppStyle;