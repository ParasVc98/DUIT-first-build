import React, { Component } from 'react';
import { 
    View,
    Text,
    StatusBar,
    StyleSheet
} from 'react-native';
import ScreenHeader from '../../components/layout/headers/ScreenHeader';
import { Avatar } from 'react-native-elements';
import QRCode from 'react-native-qrcode';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import AppStyle, { calculateFontSizeByPlatform, regularFontStyles, lightFontStyles} from '../../styles/AppStyle';

const { primaryBackgroundColor } = AppStyle;

/**
 * @name QRCodeViewScreen.js
 * @type { class }
 * @description This class contains the root component used to
 *              render the QRCodeViewScreen.
 */

class QRCodeViewScreen extends Component {

    render() {

        let { goBack } = this.props.navigation;
        let { avatarImage, userName, designation } = this.props.navigation.state.params;

        return (
            <View style={styles.container}>

                <StatusBar barStyle={'dark-content'} animated />

                <ScreenHeader title={'My QR Code'} onPress={() => goBack()} />

                <View style={{ backgroundColor: 'transparent', paddingVertical: 32, paddingHorizontal: 40 }}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                    
                        <Avatar
                            xlarge
                            rounded
                            overlayContainerStyle={{ backgroundColor: '#F1F1F1' }}
                            source={{ uri: avatarImage }}
                            activeOpacity={1.0}
                        />

                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>

                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: '#000', fontSize: calculateFontSizeByPlatform(4.20), ...lightFontStyles }}>{userName.value}</Text>

                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'transparent'}}>
                    
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={{ color: '#000', fontSize: calculateFontSizeByPlatform(3.36), ...lightFontStyles }}>{designation.value}</Text>

                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', paddingVertical: 10 }}>

                        <QRCode
                            value={'https://www.tryduit.com/'}
                            size={responsiveHeight(30)}
                            bgColor='#000'
                            fgColor='#FFF' />
                    
                    </View>

                    <View style={{ backgroundColor: 'transparent'}}>
                    
                        
                    </View>

                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({

    container: {

        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: primaryBackgroundColor
    }
});

export default QRCodeViewScreen;