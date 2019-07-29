import React, { Component } from 'react';
import DynamicWebView from '../../components/layout/webview/DynamicWebView';

/**
 * @name FeedbackBugScreen.js
 * @type { class }
 * @description This class contains the root component used to
 *              render the FeedbackBugScreen.js
 */

class FeedbackBugScreen extends Component {

    render() {

        let { pageURL } = this.props.navigation.state.params;

        return (
            <DynamicWebView website={'crackwatch'} url={pageURL} />
        );
    }
};

export default FeedbackBugScreen;