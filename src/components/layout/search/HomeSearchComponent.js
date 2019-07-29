import React, { Component } from 'react';
import { 
    View,
    Text,
    Share,
    ScrollView,
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import GridView from 'react-native-super-grid';
import { Avatar } from 'react-native-elements';
import SampleSearchData from './SampleSearchData.json';
import SearchData from './SearchData.json';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../../styles/AppStyle';
import ExchangeCardListComponent from '../../../screens/HomeTabScreen/ExchangeCards/ExchangeCardListComponent.js';

const { height, width } = Dimensions.get('window');
const { primaryBackgroundColor, primaryThemeColor, lightGrey4 } = AppStyle;

/**
 * @name HomeScreenSearchComponent.js
 * @type { class (Statefull React Component) }
 * @returns { ReactNode }
 * @description This class contains the search component used in
 *              HomeTabScreen.js
 */

class HomeScreenSearchComponent extends Component {

    constructor(props) {

        super(props);
        this.state = {

            searchQuery: ''
        };
    };

    _handleSearch = (text) => this.setState({ searchQuery: text });

    _openExchangeCard = (card) => {

        this.props.navigation.navigate('SampleCardsScreen', { cardData: card });
        this.props.searchToggle();
    };

    render() {

        /**
         * NOTE:
         * 
         * This list can be fetched from the server and stored in the
         * redux store once the back-end is functional.
         * 
         * This data can be used to render the exchanges list as required.         *
         * 
         * Example:
         *  let { exchangesData } = this.props.reduxStore;
         */

        let { searchQuery } = this.state;

        let filteredSampleData = [...SampleSearchData, ...SearchData.reverse()].filter((elementData, index) => {

            let firstName = elementData.userName.split(' ')[0];

            if (searchQuery === '') return elementData;
            else if (firstName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) return elementData;

        });

        return (
            <View style={styles.container}>

                <SearchBar
                    noIcon
                    lightTheme
                    platform={'ios'}
                    value={this.state.searchQuery}
                    onChangeText={this._handleSearch}
                    cancelButtonTitle={'cancel'}
                    clearIcon={{ name: 'cancel', color: '#404040', style: { fontSize: calculateFontSizeByPlatform(3.20), marginTop: responsiveHeight(0) }}}
                    cancelButtonTitle={'Cancel'}
                    containerStyle={{

                        borderWidth: 0,
                        justifyContent: 'center',
                        borderTopColor: 'transparent',
                        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'transparent',
                    }}
                    inputStyle={{

                        color: '#000',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: Platform.OS === 'ios' ? responsiveHeight(0.80) : 0,
                        fontSize: calculateFontSizeByPlatform(4.40),
                        backgroundColor: 'transparent',
                        height: Platform.OS === 'ios' ? responsiveHeight(6.5) : responsiveHeight(6.5)
                    }}
                    placeholder={'Search...'} />





                {
                    filteredSampleData.length === 0 ? (

                            <View style={{ alignItems: 'center', backgroundColor: 'transparent', paddingTop: responsiveHeight(5) }}>
                                <Text style={{ fontSize: calculateFontSizeByPlatform(3.20), ...lightFontStyles }}>No user found</Text>
                            </View>
                    ) : (                            
                            // <GridView
                            //     showsVerticalScrollIndicator={false}
                            //     itemDimension={responsiveHeight(32)}
                            //     contentContainerStyle={{ margin: 0, paddingTop: 0 }}
                            //     items={[...filteredSampleData]}
                            //     renderItem={(card) => <ExchangeCardListComponent {...this.props}
                            //                             key={Math.random() * 10000}
                            //                             card={card}
                            //                             onExchangeCardPress={() => this._openExchangeCard(card)}
                            //                         />}
                            // />

                            <ScrollView>

                                {
                                    [...filteredSampleData].map((card, index) => {

                                        return <ExchangeCardListComponent {...this.props}
                                                    key={index}
                                                    card={card}
                                                    onExchangeCardPress={() => this._openExchangeCard(card)}
                                                />
                                    })
                                }

                            </ScrollView>
                            
                    )
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: primaryBackgroundColor,
        paddingHorizontal: 8,
        width: responsiveWidth(100)
    }
});

export default HomeScreenSearchComponent;