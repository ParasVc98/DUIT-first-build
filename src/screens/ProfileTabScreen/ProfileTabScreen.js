import React, { Component } from 'react';
import { 
    View,
    Text,
    AsyncStorage,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import config from '../../config/api.config';
import { Avatar } from 'react-native-elements';
import TouchableBounceButton from '../../components/layout/buttons/TouchableBounceButton';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ScreenHeader from '../../components/layout/headers/ScreenHeader';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AskUserModal from '../../components/layout/dialogs/AskUserModal';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../styles/AppStyle';

const { height, width } = Dimensions.get('window');
const { primaryThemeColor, primaryBackgroundColor, lightGrey2, lightGrey4 } = AppStyle;


/**
 * @name ProfileTabScreen.js
 * @type { class }
 * @description  This class contains the root component used to
 *               render the ProfileTabScreen.
 */

class ProfileTabScreen extends Component {

    static navigationOptions = {

        title: 'Profile',
        tabBarIcon: ({ focused, tintColor }) => (<FontAwesome
            name={'user'}
            color={ focused ? primaryThemeColor : lightGrey2 }
            size={calculateFontSizeByPlatform(4.20)}
        />)
    };

    constructor(props) {

        super(props);
        this.state = {

            isLogoutDialogDisplayed: false
        };
    };

     /**
     * @type { function }
     * @param { none }
     * @returns { void }
     * @description Local method that toggles the logout dialog.
     */
    
    _toggleLogoutChangesDialog = () => {

        this.setState({

            isLogoutDialogDisplayed: !this.state.isLogoutDialogDisplayed
        });
    };

    _logoutUser = async () => {

        this._toggleLogoutChangesDialog();

        await AsyncStorage.clear();

        this.props.navigation.navigate('AppIntroScreen');
        this.props.logoutUserHandler();
    };

    render() {

        let { navigate } = this.props.navigation;
        let { feedbackFormLink, bugReportFormLink } = config;


        /**
         * Note:
         * This array of objects is mapped to UI.
         * 
         * More option's can be added based on the schema:
         * 
         * {
         *  title: String
         *  icon: String
         *  onPress: function
         *  IconComponent: [IconType]
         * }
         * 
         * IconType includes icon packs like Ionicons, AntDesign, MaterialIcons
         */

        const profileOptions = [

            {
                title: 'Analytics',
                icon: 'google-analytics',
                onPress: () => alert('open analytic screen'),
                IconComponent: MaterialCommunityIcons
            },
            {
                title: 'Give Feedback',
                icon: 'smiley',
                onPress: () => this.props.navigation.navigate('FeedbackBugScreen', { pageURL: feedbackFormLink }),
                IconComponent: Octicons
            },
            {
                title: 'Report A Bug',
                icon: 'bug',
                onPress: () => this.props.navigation.navigate('FeedbackBugScreen', { pageURL: bugReportFormLink }),
                IconComponent: MaterialCommunityIcons
            },
            // {
            //     title: 'Settings',
            //     icon: 'settings',
            //     onPress: () => alert('to settings screen'),
            //     IconComponent: MaterialCommunityIcons
            // },
            // {
            //     title: 'Logout',
            //     icon: 'log-out',
            //     onPress: () => this._toggleLogoutChangesDialog(),
            //     IconComponent: Feather
            // }
        ];

        let { profileImage, firstNameField, lastNameField } = this.props.profileScreenData;

        return (
            <View style={styles.container}>

                <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: primaryBackgroundColor }}>

                  <View style={{ flex: 1, backgroundColor: 'transparent', }}>

                    <ScreenHeader title={'Profile'} onPress={() => navigate('HomeTabScreen')} />

                    <View style={{ padding: 12, paddingTop: height * 0.04, backgroundColor: 'transparent' }}>

                        <TouchableBounceButton onPress={() => navigate('EditDuitProfileScreen', { from_screen: 'ProfileTabScreen' })} style={{ flexDirection: 'row', backgroundColor: 'transparent', padding: 4, margin: 4, marginHorizontal: 12, marginBottom: height * 0.02, borderBottomColor: 'rgba(0, 0, 0, 0.15)', borderBottomWidth: 0 }}>

                            <View style={{ flex: 2, backgroundColor: 'transparent', padding: 4 }}>
                                <View style={{ justifyContent: 'center', backgroundColor: 'transparent', padding: 4, }}>
                                    <Text style={{ color: '#000', fontSize: calculateFontSizeByPlatform(3.50), textAlign: 'left', ...lightFontStyles }}>{firstNameField.value} {lastNameField.value}</Text> 
                                </View>
                                <View style={{ justifyContent: 'center', backgroundColor: 'transparent', padding: 4 }}>
                                    <Text style={{ color: '#000', fontSize: calculateFontSizeByPlatform(2.15), textAlign: 'left', ...lightFontStyles }}>View and Edit Profile</Text>                                     
                                </View>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',  backgroundColor: 'transparent', padding: 2 }}>
                                <Avatar
                                    large
                                    rounded
                                    imageProps={{ backgroundColor: primaryBackgroundColor }}
                                    source={{ uri: profileImage.uri }}
                                    activeOpacity={1.0}
                                />
                            </View>

                        </TouchableBounceButton>


                        {
                            profileOptions.map((option, index) => {

                                let { title, icon, IconComponent, onPress } = option;

                                return (

                                    <TouchableBounceButton key={index} onPress={() => onPress()} style={{ flexDirection: 'row', alignItems: 'center',
                                                                          backgroundColor: 'transparent', padding: 2,
                                                                          paddingLeft: 2, margin: 4, marginHorizontal: 20,
                                                                          borderBottomWidth: 0, borderBottomColor: 'rgba(0, 0, 0, 0.15)' }}>
                        
                                        <IconComponent name={icon} size={calculateFontSizeByPlatform(4)} style={{ margin: 4, marginTop: 6 }} />
                                        <Text style={{ marginLeft: 12, color: '#000', fontSize: calculateFontSizeByPlatform(2.5), textAlign: 'center', alignSelf: 'center', ...lightFontStyles }}>{title}</Text>                                     
                        
                                    </TouchableBounceButton>
                                );
                            })
                        }

                    </View>
                  </View>
                  <Text style={{ textAlign: 'center', color: lightGrey4, fontSize: calculateFontSizeByPlatform(2.25), margin: 8, ...lightFontStyles }}>DUIT Version 2.0</Text>
                </ScrollView>

                <AskUserModal headerContent={'Logout'}
                    subContent={'Do you want to log out?'}
                    isVisible={this.state.isLogoutDialogDisplayed}
                    toggleDialog={this._toggleLogoutChangesDialog}
                    successButtonText={'Logout'}
                    successButtonTextColor={primaryThemeColor}
                    failureButtonText={'Cancel'}
                    failureButtonTextColor={'#FFF'}
                    onSuccess={() => this._logoutUser()}
                    onFailure={() => { this._toggleLogoutChangesDialog(); }} />
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

        profileScreenData: state.profileScreenData
    };
};

const mapDispatchToProps = (dispatch) => {

    return {

        logoutUserHandler: () => dispatch({ type: 'DUIT::APP::LOGOUT' })
    };
};  
export default connect(mapStateToProps, mapDispatchToProps)(ProfileTabScreen);