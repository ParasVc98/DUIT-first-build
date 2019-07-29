import React from 'react';
import { View, Text, Share } from 'react-native';
import { Avatar } from 'react-native-elements';
import TouchableBounceButton from '../../../components/layout/buttons/TouchableBounceButton';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../../styles/AppStyle';

const { primaryBackgroundColor, primaryThemeColor, lightGrey4 } = AppStyle;

class ExchangeCardListComponent extends React.Component {

    _shareExchangedCard = async (card) => {

        let { rec_name } = card;

        const shareResult = await Share.share({

            title:
                `${rec_name}\'s card`,
            message:
                `Hi I am sharing ${rec_name}'s card information with you.`,
            url:
                'https://www.tryduit.com/'
        }, {
                subject: `${rec_name}\'s card`,
                dialogTitle: 'Sharing'
            });

    };

    render() {
        //rec_name : name of person who receives a card from me
        let { card, card: { rec_name , designation, userImages }, onExchangeCardPress } = this.props;

        return (

            <TouchableBounceButton onPress={() => onExchangeCardPress()} style={{ flexDirection: 'row', paddingHorizontal: 2, marginVertical: 4, backgroundColor: 'transparent', borderRadius: 5 }}>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', padding: 2 }}>

                    <Avatar
                        medium
                        rounded
                        source={{ 
                            //uri: userImages[0] 
                            uri: 'https://ichef.bbci.co.uk/news/320/cpsprodpb/37B5/production/_89716241_thinkstockphotos-523060154.jpg'
                        }}
                        activeOpacity={1.0}
                    />

                </View>

                <View style={{ flex: 1, backgroundColor: 'transparent', marginLeft: 8, paddingVertical: 2, paddingRight: 2, borderBottomWidth: 0.4, borderBottomColor: 'rgba(0, 0, 0, 0.2)' }}>

                    <View style={{ backgroundColor: 'transparent', padding: 2 }}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ fontSize: calculateFontSizeByPlatform(2.40), ...lightFontStyles }}>{rec_name}</Text>
                    </View>

                    <View style={{ backgroundColor: 'transparent', padding: 2 }}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: lightGrey4, fontSize: calculateFontSizeByPlatform(2.00), ...lightFontStyles }}>{designation}</Text>
                    </View>

                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', borderBottomWidth: 0.4, borderBottomColor: 'rgba(0, 0, 0, 0.2)' }}>

                    <TouchableBounceButton onPress={() => this._shareExchangedCard(card)} style={{ backgroundColor: '#ffffff' ,borderRadius: 5, paddingHorizontal: 20, paddingVertical: 6, marginHorizontal: 10,borderWidth:1,borderColor:"#D3D3D3"	 }}>
                        <Text style={{ color: "#4282ee", fontSize: calculateFontSizeByPlatform(2.00), ...lightFontStyles }}>Share</Text>
                    </TouchableBounceButton>

                </View>

            </TouchableBounceButton>
        );
    };
};



export default ExchangeCardListComponent;