import { StatusBar, Platform } from 'react-native';
import AppStyle, { regularFontStyles, lightFontStyles } from './AppStyle';
import { iOSColors } from 'react-native-typography';

const { green, orange, red } = iOSColors;
const { primaryThemeColor } = AppStyle;
/**
 * @name DropDownAlertStyles.js
 * @type { Object }
 * @description This file exports the global styles implemented by all the
 *              drop down notification modal.
 */

export default DropDownAlertStyles = {

    updateStatusBar: false,
    successColor: green,
    infoColor: primaryThemeColor,
    warnColor: orange,
    errorColor: red,
    closeInterval: 2000,
    userNativeDriver: true,
    titleStyle: { 

        fontSize: 18,
        textAlign: 'left',
        color: 'white',
        backgroundColor: 'transparent',
        ...regularFontStyles
    },
    messageStyle: {

        fontSize: 15, 
        textAlign: 'left', 
        color: 'white', 
        backgroundColor: 'transparent',
        ...lightFontStyles
    },
    defaultContainer: {

        padding: 4,
        paddingHorizontal: 8,
        flexDirection: 'row',
        marginTop: Platform.OS === 'ios' ? 0 : 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    }
};