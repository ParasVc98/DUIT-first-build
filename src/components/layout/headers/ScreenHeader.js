import React from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import TouchableBounceButton from '../buttons/TouchableBounceButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../../styles/AppStyle';

const { height, width } = Dimensions.get('window');
const { primaryThemeColor , screenHeaderColor ,white} = AppStyle;

/**
 * @name ScreenHeader.js
 * @type { function (Stateless React Component) }
 * @returns { ReactNode }
 * @description This function contains the screen header component.
 */

const ScreenHeader = (props) => {

    let { title, iconName, iconSize, onPress, contentContainerStyle, textContainerStyles, textStyles } = props;

    return (
        <View style={{ flexDirection: 'row', width, backgroundColor: screenHeaderColor , borderBottomWidth: 0.5, borderBottomColor: 'rgba(0, 0, 0, 0.1)', height: responsiveHeight(7.6), paddingVertical: Platform.OS === 'ios' ? 0 : responsiveHeight(1), ...contentContainerStyle }}>

            <TouchableBounceButton onPress={onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 5, backgroundColor: 'transparent' }}>
                <Ionicons name={ iconName || 'ios-arrow-round-back'} size={ iconSize || calculateFontSizeByPlatform(4.0)} style={{ color: '#FFF' }} />
            </TouchableBounceButton>

            <View style={{ flex: 6, justifyContent: 'center', backgroundColor: 'transparent', padding: 2, paddingLeft: 8, ...textContainerStyles }}>
                <Text style={{ color: white , fontSize: calculateFontSizeByPlatform(2.5), ...textStyles, ...lightFontStyles }}>{title}</Text>
            </View>
            
        </View>
    );
};

export default ScreenHeader;