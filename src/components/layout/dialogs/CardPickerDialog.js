import React from 'react';
import { View, Platform, Text, Dimensions } from 'react-native';
import Dialog, { DialogContent, ScaleAnimation, SlideAnimation } from 'react-native-popup-dialog';
import TouchableBounceButton from '../buttons/TouchableBounceButton';
import AppStyle, { calculateFontSizeByPlatform, lightFontStyles } from '../../../styles/AppStyle';

const { height, width } = Dimensions.get('window');
const { primaryThemeColor } = AppStyle;

/**
 * @name CardPickerDialog.js
 * @type { function (Stateless React Component) }
 * @returns { ReactNode }
 * @description This function contains the card picker dialog component.
 */

const CardPickerDialog = (props) => {

    let { data, isCardPickerDisplayed, togglePicker, setPickerValue } = props;

    let optionContent = null;

    if (data.length === 0) {

        optionContent = (<View style={{ alignItems: 'center', justifyContent: 'center',  backgroundColor: 'transparent'}}>
                            <Text style={{ fontSize: 18, ...lightFontStyles }}>Please add a card first</Text>
                         </View>)

    } else {

        optionContent = data.map((value, index) => {

            let { designationField } = value;

            return <TouchableBounceButton key={index} onPress={() => setPickerValue(designationField.value)}
                style={{
                    paddingTop: 8, paddingBottom: 8, borderRadius: 5,
                    alignItems: 'center', justifyContent: 'center',
                    marginVertical: 10, backgroundColor: 'rgba(0, 0, 0, 0.1)'
                }}>
                <Text style={{ fontSize: calculateFontSizeByPlatform(2.50), ...lightFontStyles }}>{designationField.value}</Text>
            </TouchableBounceButton>
        })
    }

    return (
        <Dialog containerStyle={{ backgroundColor: 'transparent' }} 
                animationDuration={Platform.OS === 'ios' ? 500 : 800}
                onTouchOutside={togglePicker}
                dialogAnimation={Platform.OS === 'ios' ? new ScaleAnimation() : new SlideAnimation({ slideFrom: 'bottom' })}
                onRequestClose={togglePicker} presentationStyle={'overFullScreen'}
                transparent visible={isCardPickerDisplayed} animationType={'slide'}>

            <DialogContent style={{

                width: width * 0.92,
                padding: 20,
                backgroundColor: '#EFEFEF',
                borderRadius: 10
            }}>
                <Text style={{ textAlign: 'center', fontSize: calculateFontSizeByPlatform(3.20), marginBottom: 10, padding: 4, ...lightFontStyles }}>Please pick a card</Text>

                {
                    optionContent
                }

                <TouchableBounceButton onPress={() => togglePicker()} 
                                 style={{ borderRadius: 5, alignItems: 'center', justifyContent: 'center',
                                          paddingTop: 10, paddingBottom: 10, marginTop: 15, backgroundColor: primaryThemeColor
                                        }}>
                    <Text style={{ color: '#EEE', fontSize: calculateFontSizeByPlatform(2.20), ...lightFontStyles }}>Cancel</Text>
                </TouchableBounceButton>

            </DialogContent>
        </Dialog>
    );
};

export default CardPickerDialog;