import React, { Component } from 'react';
import { 
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import * as ExpoIcon from 'react-native-vector-icons';
import { Avatar } from 'react-native-elements';
import SampleCardData from './SampleCardsData.json';
import TouchableBounceButton from '../../../components/layout/buttons/TouchableBounceButton';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../../styles/AppStyle';

const { height, width } = Dimensions.get('window');
const { primaryBackgroundColor } = AppStyle;

/**
 * @name SampleCards.js
 * @type { class (Statefull React Component) }
 * @description This class contains the exchange cards component used in
 *              HomeTabScreen.js
 */

class SampleCards extends Component {
    
     /**
    *  Sample Card JSON schema:
    *   {
    *       "userName": "",
    *       "phoneNumber": "",
    *       "designation": "",
    *       "userImages": [],
    *       "companyName": "",
    *       "emailId": "",
    *       "companyWebsite": "",
    *       "about": ""
    *   }
    */
   
    _renderSampleCardList = (card, index) => {

        let { userName, designation, userImages } = card;

        return (

            <TouchableBounceButton key={index} onPress={() => this.props.navigation.navigate('SampleCardsScreen', { cardData: card })} style={{ flexDirection: 'row', paddingHorizontal: 4, marginVertical: 4, backgroundColor: 'transparent', borderRadius: 5 }}>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', padding: 2 }}>

                    <Avatar
                        medium
                        rounded
                        source={{ uri: userImages[0] }}
                        activeOpacity={1.0}
                    />
                
                </View>

                <View style={{ flex: 1, backgroundColor: 'transparent', marginLeft: 8, paddingVertical: 2, paddingRight: 2, borderBottomWidth: 0.4, borderBottomColor: 'rgba(0, 0, 0, 0.2)' }}>
                
                    <View style={{ backgroundColor: 'transparent', padding: 2 }}>
                        <Text style={{ fontSize: calculateFontSizeByPlatform(2.40), ...lightFontStyles }}>{userName}</Text>
                    </View>

                    <View style={{ backgroundColor: 'transparent', padding: 2 }}>
                        <Text style={{ color: '#6A6262', fontSize: calculateFontSizeByPlatform(2.00), ...lightFontStyles }}>{designation}</Text>
                    </View>

                </View>

            </TouchableBounceButton>
        );
    };

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, marginTop: responsiveHeight(2) }}>
                <TouchableOpacity disabled={true} style={{backgroundColor: '#EEE',padding: 8 }}>
                    <Text style={{ fontSize: calculateFontSizeByPlatform(2.50), marginLeft: 10 }}>Sample Cards</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, backgroundColor: 'transparent', height: responsiveHeight(32), marginTop: responsiveHeight(1),marginLeft:10 }}>

                    {
                        [...SampleCardData].map((card, index) => {

                            return this._renderSampleCardList(card, index);
                        })
                    }

                </View>
            </View>
        );
    }
};

export default SampleCards;