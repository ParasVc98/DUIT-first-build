import React, { Component } from 'react';
import { Animated, FlatList, Platform, ScrollView, View } from 'react-native';

import PropTypes from 'prop-types';

export default class Collapsible extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    flatList: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    renderContent: PropTypes.any,
    renderHeader: PropTypes.any.isRequired
  };

  static defaultProps = {
    backgroundColor: 'transparent',
    flatList: false,
    max: 44,
    min: Platform.select({ ios: 20, android: 24 }),
    renderContent: null
  };

  scroll = new Animated.Value(0);

  max = this.props.max + this.props.min;

  contentPosition = this.scroll.interpolate({
    inputRange: [0, this.max],
    outputRange: [this.max, this.props.min],
    extrapolate: 'clamp'
  });

  headerPosition = this.scroll.interpolate({
    inputRange: [0, this.max],
    outputRange: [0, this.props.min - this.max],
    extrapolate: 'clamp'
  });

  headerOpacity = this.scroll.interpolate({
    inputRange: [0, this.max],
    outputRange: [1, 0]
  });

  AnimatedComponent = Animated.createAnimatedComponent(
    this.props.flatList ? FlatList : ScrollView
  );

  render() {
    const {
      backgroundColor,
      flatList,
      max,
      min,
      renderContent,
      renderHeader,
      ...scrollViewProps
    } = this.props;

    const onScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.scroll } } }],
      { useNativeDriver: true }
    );

    const contentContainerStyle = [
      { paddingBottom: min },
      scrollViewProps.contentContainerStyle
    ];

    const contentStyle = [
      { transform: [{ translateY: this.contentPosition }] },
      scrollViewProps.style
    ];

    const headerContainerStyle = [
      styles.header,
      {
        backgroundColor,
        height: this.max,
        paddingTop: min,
        transform: [{ translateY: this.headerPosition }]
      }
    ];

    const headerStyle = [styles.full, { opacity: this.headerOpacity }];

    return (
      <View style={styles.full}>
        <this.AnimatedComponent
          contentContainerStyle={contentContainerStyle}
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={contentStyle}
          {...scrollViewProps}>
          {renderContent}
        </this.AnimatedComponent>

        <Animated.View style={headerContainerStyle}>
          <Animated.View style={headerStyle}>{renderHeader}</Animated.View>
        </Animated.View>
      </View>
    );
  }
}

const styles = {
  full: { flex: 1 },
  header: { left: 0, position: 'absolute', right: 0, top: 0 }
};
