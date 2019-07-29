import React, { Component } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    StatusBar,
    Platform,
    ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import ProgressiveImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import { Button } from 'react-native-elements';
import TouchableBounceButton from '../../../components/layout/buttons/TouchableBounceButton';
import UserDetailFields from '../CardViewScreen/UserDetailFields';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../../styles/AppStyle';

const { height, width } = Dimensions.get('window');
const { primaryBackgroundColor } = AppStyle;

/**
 * @name SampleCardsScreen.js
 * @type { class (Statefull React Component) }
 * @description This class contains the sample cards component used in
 *              SampleCards.js
 */

class SampleCardsScreen extends Component {

    constructor(props) {

        super(props);
    };

    _navigateTo = (route) => {

        let { navigate } = this.props.navigation;

        let { cardData: { userImages, userNameField: userName, designationField: designation } } = this.props.navigation.state.params;

        navigate(route, { avatarImage: userImages[0], userName, designation });
    };

    render() {

        let { goBack } = this.props.navigation;
        let { cardData: { userName,
                          phoneNumber,
                          designation,
                          userImages, 
                          companyName,
                          emailId,
                          companyWebsite,
                          about }} = this.props.navigation.state.params;

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

                             {/* <Icon name={'qrcode'} type={'material-community'}
                                component={TouchableBounceButton} onPress={() => this._navigateTo('QRCodeViewScreen')}
                                containerStyle={{ alignItems: 'flex-start' }}
                                size={28} color={'#FFF'} />

                                <Icon name={'share-variant'} type={'material-community'}
                                component={TouchableBounceButton} onPress={() => alert('share')}
                                containerStyle={{ alignItems: 'flex-start' }}
                                size={28} color={'#FFF'} />

                            <Icon name={'pencil'} type={'material-community'}
                                component={TouchableBounceButton} onPress={() => alert('edit')}
                                containerStyle={{ alignItems: 'flex-start' }}
                                size={28} color={'#FFF'} />

                            <Icon name={'delete-forever'} type={'material-community'}
                                component={TouchableBounceButton} onPress={() => alert('delete')}
                                containerStyle={{ alignItems: 'flex-start' }}
                                size={28} color={'#FFF'} /> */}

                        </View>

                    </View>


                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ zIndex: 1, backgroundColor: 'transparent', padding: 0 }}>

                        <View style={{ height: height * 0.8, width }}>

                            <Swiper
                                autoplay
                                autoplayTimeout={4.0}
                                nextButton={<View style={{ backgroundColor: 'transparent', height: height * 0.6, width: width * 0.08 }}></View>}
                                prevButton={<View style={{ backgroundColor: 'transparent', height: height * 0.6, width: width * 0.08 }}></View>}
                                activeDot={<View style={{ backgroundColor: '#FFF', width: (width * 0.84) / userImages.length, height: 2, borderRadius: 2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
                                dot={<View style={{ backgroundColor: '#A8AEB2', width: (width * 0.84) / userImages.length, height: 2, borderRadius: 2, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, }} />}
                                style={{ zIndex: 0 }} showsButtons={true}>

                                {
                                    userImages.map((image, index) => (

                                        <View key={index} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                            <ProgressiveImage
                                                source={{ uri: image }}
                                                imageStyle={{ resizeMode: index === userImages.length - 1 ? 'contain' : 'cover', borderRadius: 5, position: 'absolute', zIndex: -99 }}
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

                                            <Text style={{ position: 'absolute', zIndex: 99, bottom: 44, left: 20, color: 'white', fontSize: calculateFontSizeByPlatform(4.40), ...lightFontStyles }}>{ index === 0 ? userName : '' }</Text>
                                            <LinearGradient colors={['rgba(0, 0, 0, 0.8)', 'transparent', 'transparent', 'rgba(0, 0, 0, 1.0)']}
                                                style={{ flex: 1, height: '100%', width: '100%', justifyContent: 'center' }} >
                                            </LinearGradient>

                                        </View>
                                    ))
                                }

                            </Swiper>
                        </View>

                        <UserDetailFields
                            disabled
                            userPhoneNumber={phoneNumber}
                            designation={designation}
                            companyName={companyName}
                            emailId={emailId}
                            companyWebsite={companyWebsite}
                            about={about}
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
                            onPress={() => alert('You can call the user using this.')}
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

            </View>

        );
    };
};

const styles = StyleSheet.create({

    container: {

        flex: 1,
        backgroundColor: 'transparent'
    }
});

export default SampleCardsScreen;