import React, { Component } from 'react';
import { 
    View,
    Text,
    Dimensions
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TouchableBounceButton from '../../../components/layout/buttons/TouchableBounceButton';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../../styles/AppStyle';
import Communications from 'react-native-communications';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const { height, width } = Dimensions.get('window');
const { primaryBackgroundColor } = AppStyle;

/**
 * @name UserDetailFields.js
 * @type { class }
 * @description This class contains component used to render the
 *              user detail field in the CardViewScreen.js screen.
 */

class UserDetailFields extends Component {

    render() {

        let { disabled, 
              userPhoneNumber,
              designation,
              companyName,
              emailId,
              companyWebsite,
              about } = this.props;

        // if(disabled === undefined) disabled = false;

        return (

        <React.Fragment>

                <View style={{ backgroundColor: '#000', padding: 8, paddingRight: responsiveWidth(10) }}>

                    <View style={{ flexDirection: 'row', backgroundColor: 'transparent', padding: 6, paddingHorizontal: 8 }}>
                        <MaterialCommunityIcons name={'briefcase'} size={calculateFontSizeByPlatform(3.20)} style={{ color: '#FFF' }} />
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ marginLeft: width * 0.05, color: '#FFF', fontSize: calculateFontSizeByPlatform(2.50), ...lightFontStyles }}>{designation} at {companyName}</Text>
                    </View>
                    <TouchableBounceButton onPress={() => disabled ? undefined : Communications.phonecall(userPhoneNumber, true)} style={{ flexDirection: 'row', backgroundColor: 'transparent', padding: 6, paddingHorizontal: 8 }}>
                        <MaterialCommunityIcons name={'cellphone'} size={calculateFontSizeByPlatform(3.20)} style={{ color: '#FFF' }} />
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ marginLeft: width * 0.05, color: '#FFF', fontSize: calculateFontSizeByPlatform(2.50), ...lightFontStyles }}>{userPhoneNumber}</Text>
                    </TouchableBounceButton>
                    <TouchableBounceButton onPress={() => disabled ? undefined : Communications.email([emailId], null, null, 'Hey I saw your card.', 'Hello, saw your Duit profile')} style={{ flexDirection: 'row', backgroundColor: 'transparent', padding: 6, paddingHorizontal: 8 }}>
                        <MaterialCommunityIcons name={'email-outline'} size={calculateFontSizeByPlatform(3.20)} style={{ color: '#FFF' }} />
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ marginLeft: width * 0.05, color: '#FFF', fontSize: calculateFontSizeByPlatform(2.50), ...lightFontStyles }}>{emailId}</Text>
                    </TouchableBounceButton>
                    <TouchableBounceButton onPress={() => disabled ? undefined : Communications.web(`https://${companyWebsite}`)} style={{ flexDirection: 'row', backgroundColor: 'transparent', padding: 6, paddingHorizontal: 8 }}>
                        <MaterialCommunityIcons name={'web'} size={calculateFontSizeByPlatform(3.20)} style={{ color: '#FFF' }} />
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ marginLeft: width * 0.05, color: '#FFF', fontSize: calculateFontSizeByPlatform(2.50), ...lightFontStyles }}>{companyWebsite}</Text>
                    </TouchableBounceButton>

                </View>
            
                <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, borderTopLeftRadius: 5, borderTopRightRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, padding: 8 }}>
                    <View style={{ flex: 1, backgroundColor: 'transparent', padding: 4, paddingHorizontal: 8 }}>
                        <Text style={{ color: '#000', fontSize: calculateFontSizeByPlatform(4.50), ...lightFontStyles }}>About</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'transparent', padding: 4, paddingHorizontal: 8 }}>

                        <Text style={{ color: '#000', fontSize: calculateFontSizeByPlatform(2.50), ...lightFontStyles }}>
                            {about}
                        </Text>

                    </View>
                </View> 
            
            </React.Fragment>
        );
    };
};

export default UserDetailFields;