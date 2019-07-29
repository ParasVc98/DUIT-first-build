# react-native-collapsible-header

[![npm version](https://badge.fury.io/js/react-native-collapsible-header.svg)](https://badge.fury.io/js/react-native-collapsible-header)

<img src="https://raw.githubusercontent.com/sonaye/react-native-collapsible-header/master/demo.gif" width="400">

[Inspiration](https://medium.com/appandflow/react-native-collapsible-navbar-e51a049b560a). (also this [Snack](https://snack.expo.io/B1v5RS7ix))

# Installation

`yarn add react-native-collapsible-header`

# Definition

```javascript
type collapsible = {
  backgroundColor?: string,
  flatList?: boolean, // default = false
  max?: number, // default = 44
  min?: number, // default = 20 (ios), 24 (android)
  renderContent: any, // <Component />
  renderHeader: any // <Component />
  // ScrollView props can be passed
  // FlatList props can be passed
};
```

## Example

```javascript
import React, { Component } from 'react';
import { Platform, StatusBar, Text, View } from 'react-native';

import Collapsible from 'react-native-collapsible-header';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Header</Text>
  </View>
);

const Content = ({ gray }) => {
  const contentStyle = [
    styles.content,
    { backgroundColor: gray ? '#f7f7f7' : '#fff' }
  ];

  return (
    <View style={contentStyle}>
      <Text style={styles.contentText}>Content</Text>
    </View>
  );
};

const color = '#0f9d58';

export default class Example extends Component {
  componentWillMount() {
    StatusBar.setBarStyle('light-content', true);
  }

  render() {
    return (
      <Collapsible
        backgroundColor={color}
        renderHeader={<Header />}
        // renderContent is not needed if using FlatList
        renderContent={
          <View>
            <Content />
            <Content gray />
            <Content />
            <Content gray />
            <Content />
            <Content gray />
            <Content />
            <Content gray />
            <Content />
            <Content gray />
          </View>
        }

        // flatList
        // data={Array(10).fill()}
        // keyExtractor={(item, i) => String(i)}
        // renderItem={({ index }) => <Content gray={index % 2 !== 0} />}
      />
    );
  }
}

const styles = {
  header: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  headerText: { color: '#fff' },
  content: { alignItems: 'center', justifyContent: 'center' },
  contentText: { color: '#444', padding: 40 }
};
```
