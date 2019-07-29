import React, { Component } from 'react';
import {
    View,
    Dimensions,
    Platform,
    StatusBar,
    WebView,
    StyleSheet
} from 'react-native';
import { LineDotsLoader } from 'react-native-indicator';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import AppStyle from '../../../styles/AppStyle';

const AnimatedWebView = Animatable.createAnimatableComponent(WebView);
const { height, width } = Dimensions.get('window');
const { primaryThemeColor } = AppStyle;

/**
 * @name DynamicWebView.js
 * @type { class (Statefull React Component) }
 * @returns { ReactNode }
 * @description This class contains the dynamic webview component used in
 *              FeedbackBugScreen.js
 */

class DynamicWebView extends Component {

    animatedWebViewRef = ref => this.webview = ref;

    _webviewLoadingIndicator = () => {

        return (

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <LineDotsLoader
                    size={responsiveFontSize(2.0)}
                    dotsNumber={5}
                    betweenSpace={10}
                    color={primaryThemeColor}
                />

            </View>

        );
    };

    render() {

        return (

            <LinearGradient colors={['#FFF', '#FFF']} style={{ flex: 1 }}>
                <View style={styles.container}>

                    <StatusBar
                        backgroundColor='transparent'
                        barStyle='dark-content'
                    />

                    <AnimatedWebView
                        ref={this.animatedWebViewRef}
                        source={{ uri: this.props.url }}
                        style={{

                            opacity: 0.0,
                            marginTop: 50, //
                            backgroundColor: 'rgba(0,0,0,0)'
                        }}
                        bounces={false}
                        onLoad={() => this.webview.transitionTo({ opacity: 1.0 })}
                        javaScriptEnabled
                        domStorageEnabled
                        renderLoading={this._webviewLoadingIndicator}
                        startInLoadingState
                    />
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({

    container: {

        flex: 1
    }
});

export default DynamicWebView;