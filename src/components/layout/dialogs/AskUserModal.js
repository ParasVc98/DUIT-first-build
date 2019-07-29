import React from 'react';
import { Platform, Text, Dimensions } from 'react-native';
import Dialog, { DialogContent, ScaleAnimation, SlideAnimation } from 'react-native-popup-dialog';
import TouchableBounceButton from '../buttons/TouchableBounceButton';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles} from '../../../styles/AppStyle';

const { height, width } = Dimensions.get('window');
const { primaryThemeColor, lightGrey0 } = AppStyle;

/**
 * @name AskUserModal.js
 * @type { function (Stateless React Component) }
 * @returns { ReactNode }
 * @description This function contains the ask usermodal component.
 */

const AskUserModal = (props) => {

    let { onSuccess, onFailure,
          headerContent, subContent,
          successButtonText, failureButtonText,
          successButtonTextColor, failureButtonTextColor,
          isVisible, toggleDialog } = props;

    return (
        <Dialog containerStyle={{ backgroundColor: 'transparent' }} animationDuration={Platform.OS === 'ios' ? 500 : 800} onTouchOutside={toggleDialog} dialogAnimation={Platform.OS === 'ios' ? new ScaleAnimation() : new SlideAnimation({ slideFrom: 'bottom' })} onRequestClose={toggleDialog} presentationStyle={'overFullScreen'} transparent visible={isVisible} animationType={'slide'}>

            <DialogContent style={{

                width: width * 0.92,
                padding: 20,
                backgroundColor: '#EFEFEF',
                borderRadius: 10
            }}>
                <Text style={{ textAlign: 'left', fontSize: calculateFontSizeByPlatform(3.20), marginBottom: 8, padding: 4, ...lightFontStyles }}>{headerContent}</Text>
                <Text style={{ textAlign: 'left', fontSize: calculateFontSizeByPlatform(2.80), padding: 4, ...lightFontStyles }}>{subContent}</Text>


                <TouchableBounceButton onPress={() => onSuccess()}
                    style={{
                        borderRadius: 5, alignItems: 'center', justifyContent: 'center',
                        paddingTop: 10, paddingBottom: 10, marginTop: 15, backgroundColor: lightGrey0
                    }}>
                    <Text style={{ color: successButtonTextColor, fontSize: calculateFontSizeByPlatform(2.20), ...lightFontStyles }}>{successButtonText}</Text>
                </TouchableBounceButton>

                <TouchableBounceButton onPress={() => onFailure()}
                    style={{
                        borderRadius: 5, alignItems: 'center', justifyContent: 'center',
                        paddingTop: 10, paddingBottom: 10, marginTop: 15, backgroundColor: primaryThemeColor
                    }}>
                    <Text style={{ color: failureButtonTextColor, fontSize: calculateFontSizeByPlatform(2.20), ...lightFontStyles }}>{failureButtonText}</Text>
                </TouchableBounceButton>

            </DialogContent>
        </Dialog>
    );
};

export default AskUserModal;