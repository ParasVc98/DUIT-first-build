import React, { Component } from 'react';
import { 
    View,
    Text,
    Dimensions,
    Platform,
    StyleSheet,
    StatusBar,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import ProgressiveImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import { Button } from 'react-native-elements';
import TouchableBounceButton from '../../../components/layout/buttons/TouchableBounceButton';
import { deleteCardHandler } from '../../../store/actions/HomeScreenActionCreators';
import AskUserModal from '../../../components/layout/dialogs/AskUserModal';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../../styles/AppStyle';
import Communications from 'react-native-communications';
import UserDetailFields from './UserDetailFields';

const { height, width } = Dimensions.get('window');
const { primaryBackgroundColor } = AppStyle;

/**
 * @name CardViewScreen.js
 * @type { class }
 * @description This class contains the root component used to
 *              render the CardViewScreen.
 */

class CardViewScreen extends Component {

    constructor(props) {

        super(props);
        this.state = {

            isDeleteDialogDisplayed: false
        };

        this.currentCardIndex = null;
        this.cardData = null;
    };

    /**
     * @type { function }
     * @param { none }
     * @returns { void }
     * @description Local method that toggles the delete dialog.
     */

    _toggleDeleteDialog = () => {

        this.setState({

            isDeleteDialogDisplayed: !this.state.isDeleteDialogDisplayed
        });
    };


      /**
     * @type { function }
     * @param { none }
     * @returns { void }
     * @description Local method which dispatches delete user card action
     *              and navigates back to HomeTabScreen
     */

    _deleteCard = () => {

        let { cardData: { uniqueCardKey }} = this;


        this._toggleDeleteDialog();
        this.props.navigation.pop();

        this.props.deleteCard(uniqueCardKey);
    };

    
    /**
     * @type { function }
     * @param { String } route
     * @returns { void }
     * @description Local method navigates to the specified route.
     */

    _navigateTo = (route) => {

        let { navigate } = this.props.navigation;

        let { cardData, cardData: { userImages, userNameField: userName, designationField: designation }} = this;

        if (route === 'QRCodeViewScreen') {

            navigate(route, { avatarImage: userImages[0], userName, designation });
        }

        if (route === 'AddCardScreen') {

            navigate(route, { actionType: 'edit-card', headerTitle: 'Edit Card', cardData })            
        }
    };

    render() {

        let { goBack } = this.props.navigation;
        let { userCards } = this.props.homeScreenData;
        let { cardKey } = this.props.navigation.state.params;
        let { userPhoneNumber } = this.props.globalData;

        Object.keys(userCards).forEach((key, index) => {

            let card = userCards[key];

            if (card.uniqueCardKey === cardKey) this.currentCardIndex = index;
        });

        this.cardData = this.props.homeScreenData.userCards[this.currentCardIndex];

        let { userImages, userNameField: userName,
              phoneNumberField: phoneNumber,
              designationField: designation,
              companyNameField: companyName,
              emailIdField: emailId,
              companyWebsiteField: companyWebsite,
              aboutField: about } = this.cardData;

        return (
            <View style={styles.container}>

                <StatusBar barStyle={'light-content'} animated />

                <View style={{ flex: 20, backgroundColor: '#161616' }}>

                    <View style={{ top: 0, left: 0, zIndex: 9999, position: 'absolute', marginTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 5, flexDirection: 'row', backgroundColor: 'transparent', padding: 4 }}>


                        <View style={{ flex: 4, backgroundColor: 'transparent', paddingLeft: width * 0.02 }}>
                            <Icon name={'ios-arrow-round-back'} type={'ionicon'}
                                  component={TouchableBounceButton} onPress={() => goBack()}
                                  containerStyle={{ alignItems: 'flex-start' }}
                                  size={38} color={'#FFF'} />
                        </View>

                        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'transparent' }}>

                            <Icon name={'qrcode'} type={'material-community'}
                                  component={TouchableBounceButton} onPress={() => this._navigateTo('QRCodeViewScreen')}
                                  containerStyle={{ alignItems: 'flex-start' }}
                                  size={28} color={'#FFF'} />

                            <Icon name={'pencil'} type={'material-community'}
                                  component={TouchableBounceButton} onPress={() => this._navigateTo('AddCardScreen')}
                                  containerStyle={{ alignItems: 'flex-start' }}
                                  size={28} color={'#FFF'} />

                            <Icon name={'delete-forever'} type={'material-community'}
                                  component={TouchableBounceButton} onPress={() => this._toggleDeleteDialog()}
                                  containerStyle={{ alignItems: 'flex-start' }}
                                  size={28} color={'#FFF'} />

                        </View>

                    </View>


                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ zIndex: 1, backgroundColor: 'transparent', padding: 0 }}>

                        <View style={{ height: height *  0.8, width }}>

                          <Swiper
                            nextButton={<View style={{backgroundColor: 'transparent', height: height * 0.6, width: width * 0.20 }}></View>}
                            prevButton={<View style={{backgroundColor: 'transparent', height: height * 0.6, width: width * 0.20 }}></View>}
                            activeDot={<View style={{ backgroundColor: '#FFF', width: (width * 0.84) / userImages.length, height: 2, borderRadius: 2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
                            dot={<View style={{ backgroundColor: '#A8AEB2', width: (width * 0.84) / userImages.length, height: 2, borderRadius: 2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
                            style={{ zIndex: 0 }} showsButtons={true}>

                                {
                                  userImages.map((image, index) => (

                                    <View key={index} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                
                                        <ProgressiveImage
                                            source={{ uri: image }}
                                            imageStyle={{ resizeMode: index === userImages.length - 1 ? 'cover' : 'cover', borderRadius: 5, position: 'absolute', zIndex: -99 }}
                                            indicator={Progress.Circle}
                                            indicatorProps={{
                                                size: 80,
                                                color: '#FFF'
                                            }}
                                            style={{
                                                position: 'absolute',
                                                zIndex: -200,
                                                backgroundColor: 'transparent',
                                                width: '100%',
                                                height: '100%'
                                            }} />

                                        <Text style={{ position: 'absolute', zIndex: 99, bottom: 44, left: 20, color: 'white', fontSize: calculateFontSizeByPlatform(4.40), ...lightFontStyles }}>{ index === 0 ? userName.value : '' }</Text>
                                        <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'transparent', 'transparent', 'rgba(0, 0, 0, 1.0)']} 
                                                        style={{ flex: 1, height: '100%', width: '100%', justifyContent: 'center' }} >
                                        </LinearGradient>
                                
                                    </View>
                                    ))
                                }

                            </Swiper> 
                        </View>

                        <UserDetailFields
                            userPhoneNumber={userPhoneNumber}
                            designation={designation.value}                
                            companyName={companyName.value}
                            emailId={emailId.value}
                            companyWebsite={companyWebsite.value}
                            about={about.value}
                        />                         
                            
                    </ScrollView>
                
                </View>


                <View style={{ flex: 2, flexDirection: 'row', backgroundColor: '#202020' }}>

                    <View style={{ backgroundColor: 'transparent', justifyContent: 'center', padding: 4, paddingHorizontal: 16, width: '60%' }}>
                        <Text style={{ color: '#FFF', fontSize: calculateFontSizeByPlatform(2.60), ...lightFontStyles }}>Connect over phone</Text>
                    </View>
                    <View style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center', paddingVertical: 2, width: '40%' }}>

                        <Button
                            title={'Call Now'}
                            Component={TouchableBounceButton}
                            onPress={() => Communications.phonecall(userPhoneNumber, true)}
                            color={'#000'}
                            backgroundColor={primaryBackgroundColor}
                            fontSize={calculateFontSizeByPlatform(2.45)}
                            fontFamily={lightFontStyles['fontFamily']}
                            fontWeight={'300'}
                            buttonStyle={{

                                padding: 4,
                                paddingVertical: 8,
                                width: width * 0.32,
                                borderRadius: 5
                            }} />
                    </View>

                </View>

                <AskUserModal headerContent={'Delete Card'}
                              subContent={'Do you want to delete this card?'}
                              isVisible={this.state.isDeleteDialogDisplayed}
                              toggleDialog={this._toggleDeleteDialog}
                              successButtonText={'Delete'}
                              successButtonTextColor={'#D22'}
                              failureButtonText={'Cancel'}
                              failureButtonTextColor={'#FFF'}
                              onSuccess={() => this._deleteCard()}
                              onFailure={() => this._toggleDeleteDialog()} />

            </View>
            
        );
    };
};

const styles = StyleSheet.create({

    container: {

        flex:1,
        backgroundColor: 'transparent'
    }
});

const mapStateToProps = (state) => {

    return {

        globalData: state.globalData,        
        homeScreenData: state.homeScreenData
    };
};

const mapDispatchToProps = (dispatch) => {

    return {

        deleteCard: (uniqueCardKey) => dispatch(deleteCardHandler(uniqueCardKey))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardViewScreen);