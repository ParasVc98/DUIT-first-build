import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';

/**
 * @name ImagePickerUtils.js
 * @description This file contains utility functions for getting
 *              images from user's device.
*/

const ImagePickerOptions = {

    title: 'Select Avatar',
    noData: true,
    allowsEditing: true,
    storageOptions: {

        skipBackup: true,
        path: 'images'
    }
};

export const ImageDataRetriever = (dialogToggle, optionKey, imageProcessor) => {

    dialogToggle();

    if (optionKey === 'from_camera') {

        ImagePicker.launchCamera(ImagePickerOptions, (imageData) => imageProcessor(imageData));

    } else if (optionKey === 'from_library') {

        ImagePicker.launchImageLibrary(ImagePickerOptions, (imageData) => imageProcessor(imageData));
    }
};

export const getImageUriByPlatform = ({ uri, path }) => Platform.OS === 'ios' ? uri : `file://${path}`;
