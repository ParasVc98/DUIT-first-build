// refreshing = { this.state.refreshing }
// onRefresh = { this._onRefresh }

import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    Dimensions,
    Platform,
    StatusBar,
    TouchableWithoutFeedback,
    RefreshControl,
    StyleSheet,
    Button,
    TouchableHighlight,
    TextInput, 
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import GridView from 'react-native-super-grid';
import ProgressiveImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import TouchableBounceButton from '../../components/layout/buttons/TouchableBounceButton';
import Collapsible from 'react-native-collapsible-header';
import ScreenHeader from '../../components/layout/headers/ScreenHeader';
import SampleCards from './SampleCards/SampleCards';
import ExchangeCards from './ExchangeCards/ExchangeCards';
import MyCards from './MyCards/MyCards'
import * as Animatable from 'react-native-animatable';
import Dialog, { DialogContent, SlideAnimation, FadeAnimation } from 'react-native-popup-dialog';
import { shareUserProfileHandler } from '../../store/actions/SendScreenActionCreators';
import { responsiveHeight, responsiveWidth,responsiveFontSize } from 'react-native-responsive-dimensions';
import HomeScreenSearchComponent from '../../components/layout/search/HomeSearchComponent';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles, extraLightFontStyles} from '../../styles/AppStyle';
import DropdownAlert from 'react-native-dropdownalert';
import DropDownAlertStyles from '../../styles/DropDownAlertStyles';

const { height, width } = Dimensions.get('window');
const { primaryThemeColor, primaryBackgroundColor, lightGrey2, lightGrey4 } = AppStyle;
const AnimatedTouchableWithoutFeedback = Animatable.createAnimatableComponent(TouchableWithoutFeedback);

import { Avatar } from 'react-native-elements';


/**
 * @name HomeTabScreen.js
 * @type { class }
 * @description This class contains the root component used to
 *              render the HomeTabScreen.
 */

class HomeTabScreen extends Component {

    static navigationOptions = {

        title: 'Home',
        tabBarIcon: ({ focused, tintColor }) => (<Ionicons
            name={'md-home'}
            color={ focused ? primaryThemeColor : lightGrey2 }
            size={calculateFontSizeByPlatform(4.20)}
        />)
    };

    constructor(props) {

        super(props);
        this.state = {
            refreshing: false,
            isSearchDialogDisplayed: false,
            isHeaderAnimationFinished: false
        };
    };

    componentDidMount = async () => {

        // await this.createAnimationDelay(1000);
        // await this.playHeaderAnimations();        
    };


     /**
     * @type { async function }
     * @description Local methods that plays initial header animations.
     */

    playHeaderAnimations = async () => {

        await this.companyLogoHeaderRef.pulse(2000);
        await this.companyLogoHeaderRef.fadeOut(1000);

        this.setState({ isHeaderAnimationFinished: true },
                        async () => await this.searchBarHeaderRef.fadeIn(1000));
    };

     /**
     * @type { function }
     * @description Local methods that creates animation delay for 
     *              header animations.
     */

    createAnimationDelay = (delay) => {

        return new Promise((resolve, _) => setTimeout(() => {
            
            resolve();
        }, delay, resolve))
    };


    /**
     * @type { function }
     * @param { ReactRefObject }
     * @returns { Object }
     * @description Local methods that maps react ref object to a class
     *              variable.
     */

    _companyLogoHeaderRef = ref => this.companyLogoHeaderRef = ref;
    _searchBarHeaderRef = ref => this.searchBarHeaderRef = ref;


     /**
     * @type { function }
     * @description Local methods that dispatched redux action for sharing card
     *              and navigated to the SendScreenTab.js
     */

    _shareUserCard = (card) => {

        this.props.shareUserCard(card);

        this.props.navigation.navigate('SendTabScreen');
    };


     /**
     * @type { function }
     * @param { Object } item
     * @param { Array } itemsArray
     * @returns { ReactNode }
     * @description Local methods that maps user created cards in the grid.
     */

    _renderMyCardList = ({ item }, itemsArray) => {

        let itemIndex = itemsArray.indexOf(item);
        let { navigate } = this.props.navigation;
        let { uniqueCardKey, userImages, designationField: designation } = item;
        
        return (
            
                !(itemIndex === itemsArray.length - 1) ? (

                    <TouchableBounceButton onPress={() => navigate('CardViewScreen', { cardKey: uniqueCardKey })} style={{ height: height * 0.18375, width: height * 0.14,  }}>
                    
                       <View style={{ flex: 5, alignItems: 'center', justifyContent: 'flex-end', backgroundColor: 'transparent', borderRadius: 5 }}>

                            <ProgressiveImage

                                source={{ uri: userImages[0] }}
                                imageStyle={{ borderRadius: 5 }}
                                style={{
                                    position: 'absolute',
                                    borderRadius: 5,
                                    backgroundColor: '#F0F0F0',
                                    width: '100%',
                                    height: '100%',
                                }} />
                    
                            <TouchableBounceButton onPress={() => this._shareUserCard(item)} style={{ width: '99.8%', backgroundColor: primaryThemeColor, padding: 6, borderRadius: 5 }}>
                                <Text style={{  textAlign: 'center', color: '#FFF', fontSize: calculateFontSizeByPlatform(2.15), ...lightFontStyles }}>Share</Text>                 
                            </TouchableBounceButton>                 
                            
                        </View>
                        <View style={{ flex: 1, padding: 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ fontSize: calculateFontSizeByPlatform(2.25), ...lightFontStyles }}>{ designation.value }</Text>
                        </View>
                    </TouchableBounceButton>
                        
                    ) : (

                    <TouchableBounceButton onPress={() => this.props.navigation.navigate('AddCardScreen', { actionType: 'add-card', headerTitle: 'Add Card' })} style={{ height: height * 0.18375, width: height * 0.14, }}>

                        <View style={{ flex: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: primaryThemeColor, borderRadius: 5 }}>

                            <Ionicons name={'ios-add-circle'} size={calculateFontSizeByPlatform(5.0)} style={{ color: '#FFF', marginTop: 0 }} />

                        </View>
                        <View style={{ flex: 1, padding: 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: calculateFontSizeByPlatform(2.25), ...lightFontStyles }}>Add Card</Text>
                        </View>
                    </TouchableBounceButton>
                )
        );
    };

    
    /**
     * @type { function }
     * @description Local methods that toggles search dialog.
     */
    
    _toggleSearchDialog = () => {

        this.setState({

            isSearchDialogDisplayed: !this.state.isSearchDialogDisplayed
        });
    };

    _onRefresh = () => { 

        /**
         * Just a prop for now
         */
        this.dropDownNotification.alertWithType('info', 'Syncing', 'Syncing your data with the server');
     };

    render() {

        let { userCards } = this.props.homeScreenData;
        /**
         * Note:
         * To prevent a minor bug don't remove {} element from the variable
         * userCardModified.
         * 
         * Explanation:
         * 
         * The method responsible for rendering the user created card list
         * used this '' element as a check and decide whether to render the
         * add card or user card.
         */
        let userCardModified = [...userCards, {}];

        let { isHeaderAnimationFinished } = this.state;
 
        return (

            <View style={styles.container}>

                        <ScrollView contentContainerStyle={{ backgroundColor: primaryBackgroundColor,  paddingTop: 0 }}>

                            <View style={{ height: responsiveHeight(9), backgroundColor: '#003a72', justifyContent: 'center', paddingHorizontal: 5 }}>

                                    <TouchableHighlight activeOpacity={0.8} underlayColor={'transparent'} ref={this._searchBarHeaderRef} onPress={() => this._toggleSearchDialog()}>

                                        <View style={{ flexDirection: 'row', backgroundColor: 'white', borderRadius: responsiveHeight(1), padding: 5, marginHorizontal: responsiveWidth(1) }}>

                                            <Ionicons name={this.state.searchBarFocused ? 'md-arrow-back' : 'ios-search'} style={{ fontSize: calculateFontSizeByPlatform(4), marginLeft: responsiveWidth(1) }} />

                                            <Text style={{ fontSize: Platform.OS === 'ios' ? calculateFontSizeByPlatform(3.5) : calculateFontSizeByPlatform(3.0), color: '#444', marginLeft: responsiveWidth(4) }}>Search people and places</Text>

                                        </View>

                                    </TouchableHighlight>

                                </View>
            
                            <View style={{ flex: 1, backgroundColor: primaryBackgroundColor, padding: 4, paddingHorizontal: 0 }}>
                                <View style={{ backgroundColor: primaryBackgroundColor }}>
                                    
                                    <TouchableOpacity disabled={true} style={{backgroundColor: '#eeeeee',padding:8,textAlignVertical: 'center'}}>
                                        <Text style={{ fontSize: calculateFontSizeByPlatform(2.50), marginLeft: 10, marginTop: 5 }}>My Cards</Text>
                                    </TouchableOpacity>

                                    <View style={{ flex: 1, height: responsiveHeight(21), backgroundColor: 'transparent' }}>

                                        <GridView
                                            horizontal
                                            showsHorizontalScrollIndicator={false}
                                            itemDimension={responsiveHeight(16)}
                                            items={userCardModified}
                                            renderItem={(card) => this._renderMyCardList(card, userCardModified)}
                                        />

                                    </View>
 
                                </View>
                                
                                <ExchangeCards {...this.props} />

                                <SampleCards {...this.props} />

                                <Dialog containerStyle={{ backgroundColor: 'transparent', marginTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight }} animationDuration={200} onTouchOutside={this._toggleSearchDialog} 
                                        dialogAnimation={ new SlideAnimation({
                                                                toValue: 0,
                                                                slideFrom: 'bottom',
                                                                useNativeDriver: true })} 
                                        onRequestClose={this._toggleSearchDialog}
                                        presentationStyle={'overFullScreen'} transparent visible={this.state.isSearchDialogDisplayed} animationType={'slide'}>

                                    <DialogContent style={{

                                        height, width,
                                        alignSelf: 'center',
                                        paddingLeft: 0,
                                        paddingBottom: 0,
                                        paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
                                        backgroundColor: primaryBackgroundColor,
                                        borderRadius: 10
                                    }}>

                                        <View style={{ alignSelf: 'flex-start', backgroundColor: 'transparent', marginLeft: responsiveWidth(4) }}>
                                            <TouchableBounceButton onPress={() => this._toggleSearchDialog()}>
                                                <EvilIcons name={'close'} size={calculateFontSizeByPlatform(4.50)} style={{ color: '#000' }} />                                                
                                            </TouchableBounceButton>
                                        </View>

                                        <HomeScreenSearchComponent searchToggle={this._toggleSearchDialog}  {...this.props} />

                                    </DialogContent>
                                </Dialog>

                            </View>
                        </ScrollView>
                <DropdownAlert {...DropDownAlertStyles} ref={ref => this.dropDownNotification = ref} />                
            </View>
        );
    };
};

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: primaryThemeColor
    }
});

const mapStateToProps = (state) => {

    return {

        homeScreenData: state.homeScreenData
    };
};

const mapDispatchToProps = (dispatch) => {

    return {

        shareUserCard: (userCard) => dispatch(shareUserProfileHandler(userCard))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeTabScreen);