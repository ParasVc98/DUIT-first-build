import React, { Component } from 'react';

import {
    View,
    Text,
    Share,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { Avatar } from 'react-native-elements';
import SampleCardData from '../SampleCards/SampleCardsData.json';
import TouchableBounceButton from '../../../components/layout/buttons/TouchableBounceButton';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../../styles/AppStyle';
import ExchangeCardListComponent from './ExchangeCardListComponent.js';
import config from '../../../config/api.config';

const {duitServerUrl} = config;
const { height, width } = Dimensions.get('window');
const { primaryBackgroundColor, primaryThemeColor, lightGrey4 } = AppStyle;

/**
 * @name ExchangeCards.js
 * @type { class (Statefull React Component) }
 * @description This class contains the exchange cards component used in
 *              HomeTabScreen.js
 */

class ExchangeCards extends Component {

    constructor (props) {
        super (props)
        this.state = {
            data: []
        }
    }

    // _renderExchangeCardList = (item, index) => {

    //     let { userName, designation, userImages } = item;

    //     return (

    //         <TouchableBounceButton key={index} onPress={() => this.props.navigation.navigate('SampleCardsScreen', { cardData: item })} style={{ flexDirection: 'row', paddingHorizontal: 4, marginVertical: 4, backgroundColor: 'transparent', borderRadius: 5 }}>

    //             <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', padding: 2 }}>

    //                 <Avatar
    //                     medium
    //                     rounded
    //                     source={{ uri: userImages[0] }}
    //                     activeOpacity={1.0}
    //                 />

    //             </View>

    //             <View style={{ flex: 1, backgroundColor: 'transparent', marginLeft: 8, paddingVertical: 2, paddingRight: 2, borderBottomWidth: 0.4, borderBottomColor: 'rgba(0, 0, 0, 0.2)' }}>

    //                 <View style={{ backgroundColor: 'transparent', padding: 2 }}>
    //                     <Text style={{ fontSize: calculateFontSizeByPlatform(2.40), ...lightFontStyles }}>{userName}</Text>
    //                 </View>

    //                 <View style={{ backgroundColor: 'transparent', padding: 2 }}>
    //                     <Text style={{ color: lightGrey4, fontSize: calculateFontSizeByPlatform(2.00), ...lightFontStyles }}>{designation}</Text>
    //                 </View>

    //             </View>

    //             <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', borderBottomWidth: 0.4, borderBottomColor: 'rgba(0, 0, 0, 0.2)' }}>

    //                 <TouchableBounceButton onPress={() => this._shareExchangedCard(item)} style={{ backgroundColor: '#DEDEDE', borderRadius: 5, paddingHorizontal: 20, paddingVertical: 6, marginHorizontal: 10 }}>
    //                     <Text style={{ color: primaryThemeColor, fontSize: calculateFontSizeByPlatform(2.00), ...lightFontStyles }}>Share</Text>
    //                 </TouchableBounceButton>

    //             </View>

    //         </TouchableBounceButton>
    //     );
    // };

      componentDidMount() {

          let requestConfig = {
              method: 'GET',
              headers: {
                  'Authorization': 'Token 97a74c03004e7d6b0658dfdfde34fd6aa4b14ddb'
              }
          };

          return fetch(`${duitServerUrl}/api/v1/user/recieved/?to_user_id=3`, requestConfig)
                .then((response) => response.json())
                .then((responseJson) => {

                    // alert(JSON.stringify(responseJson[0]));

                    this.setState({ data: responseJson });
                }).catch((error) => {
                    alert('api error caught : ' + error);
                });
      }


    render() {

        let { navigation } = this.props;
        
        return (
            <View style={{ flex: 1, backgroundColor: primaryBackgroundColor }}>

                <TouchableOpacity disabled={true} style={{backgroundColor: '#EEE', padding:10, marginTop:5}}>
                    <Text style={{ fontSize: calculateFontSizeByPlatform(2.50), marginLeft: 10 }}>My Contacts</Text>
                </TouchableOpacity>

                <View style={{ flex: 1, backgroundColor: 'transparent', marginTop: responsiveHeight(1), marginLeft:10, marginRight: 10 }}>

                    {
                        [...this.state.data.slice().reverse()].map((card, index) => {

                            // return <ExchangeCardListComponent {...this.props}
                            //             key={index}
                            //             card={card}
                            //             onExchangeCardPress={() => navigation.navigate('SampleCardsScreen', { cardData: card })}
                            //         />
                            return <ExchangeCardListComponent {...this.props}
                                key={index}
                                card={card}
                                onExchangeCardPress={() => alert('Cannot open the card view as API isn\'t compatible \n This Currently prevents app crash')}
                            />
                        })
                    }
            
                </View>
            </View>
        );
    }
};

export default ExchangeCards;