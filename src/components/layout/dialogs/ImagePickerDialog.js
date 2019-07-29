import React from 'react';
import { Platform, Text, Dimensions } from 'react-native';
import Dialog, { DialogContent, ScaleAnimation, SlideAnimation } from 'react-native-popup-dialog';
import TouchableBounceButton from '../buttons/TouchableBounceButton';
import AppStyle, { calculateFontSizeByPlatform, regularFontStyles, lightFontStyles } from '../../../styles/AppStyle';

const { height, width } = Dimensions.get('window');
const { primaryThemeColor } = AppStyle;

/**
 * @name ImagePickerDialog.js
 * @type { function (Stateless React Component) }
 * @returns { ReactNode }
 * @description This function contains the image picker dialog component.
 */

const ImagePickerDialog = (props) => {

  let { isVisible, toggleOptionPicker, pickFromCamera, pickFromLibrary} = props;

  return (
      <Dialog containerStyle={{ backgroundColor: 'transparent' }}
              animationDuration={Platform.OS === 'ios' ? 500 : 800}
              onTouchOutside={toggleOptionPicker}
              dialogAnimation={Platform.OS === 'ios' ? new ScaleAnimation() : new SlideAnimation({ slideFrom: 'bottom' })}
              onRequestClose={toggleOptionPicker}
              presentationStyle={'overFullScreen'} 
              transparent visible={isVisible} animationType={'slide'}>

          <DialogContent style={{

              width: width * 0.92,
              padding: 20,
              backgroundColor: '#EFEFEF',
              borderRadius: 10
          }}>
              <Text style={{ textAlign: 'center', fontSize: calculateFontSizeByPlatform(3.20), marginBottom: 10, padding: 4, ...lightFontStyles }}>Upload a photo</Text>

              <TouchableBounceButton onPress={() => pickFromCamera()}
                  style={{
                      paddingTop: 8, paddingBottom: 8, borderRadius: 5,
                      alignItems: 'center', justifyContent: 'center',
                      marginVertical: 10, backgroundColor: 'rgba(0, 0, 0, 0.1)'
                  }}>
                  <Text style={{ fontSize: calculateFontSizeByPlatform(2.50), ...lightFontStyles }}>Camera</Text>
              </TouchableBounceButton>

              <TouchableBounceButton onPress={() => pickFromLibrary()}
                  style={{
                      paddingTop: 8, paddingBottom: 8, borderRadius: 5,
                      alignItems: 'center', justifyContent: 'center',
                      marginVertical: 10, backgroundColor: 'rgba(0, 0, 0, 0.1)'
                  }}>
                  <Text style={{ fontSize: calculateFontSizeByPlatform(2.50), ...lightFontStyles }}>Gallery  </Text>
              </TouchableBounceButton>

              <TouchableBounceButton onPress={() => toggleOptionPicker()}
                  style={{
                      borderRadius: 5, alignItems: 'center', justifyContent: 'center',
                      paddingTop: 10, paddingBottom: 10, marginTop: 15, backgroundColor: primaryThemeColor
                  }}>
                  <Text style={{ color: '#EEE', fontSize: calculateFontSizeByPlatform(2.20), ...lightFontStyles }}>Cancel</Text>
              </TouchableBounceButton>

          </DialogContent>
      </Dialog>
  )  
};

export default ImagePickerDialog;