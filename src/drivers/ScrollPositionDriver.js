// @flow

/* This borrows heavily from the shoutem/animation library */

import { Animated } from 'react-native';
import _ from 'lodash';

import { Driver } from '../types';

type Options = {
  useNativeDriver?: boolean,
  nativeScrollEventThrottle: number,
};

type Layout = {
  x: number,
  y: number,
  width: number,
  height: number,
};

type LayoutEvent = {
  nativeEvent: { layout: Layout },
};

type ScrollViewProps = {
  onScroll: Animated.event,
  scrollEventThrottle: number,
  onLayout: LayoutEvent => void,
};

/**
 * Animation driver that creates animated value changed on scroll event.
 * Assign onScroll as onScroll prop of React Native ScrollView, and
 * pass instance to any @shoutem/animation animation to run it
 * e.g.:
 * driver = new ScrollPositionDriver();
 * animation = new Animation({
 *  driver
 * });
 * ...
 * <ScrollView onScroll={onScroll}>
 *
 * This driver initializes a native animated value by default, but
 * it also creates a mirrored JS value as a fallback for animations
 * that are not yet supported in native.
 *
 * @param options Driver options
 * @param options.nativeScrollEventThrottle Native animated value changes
 *   will be debounced using this value when mirroring them to the JS value.
 *   Defaults to 20ms.
 */
export default class ScrollPositionDriver implements Driver {
  constructor(
    options: Options = {
      nativeScrollEventThrottle: 20,
    },
  ) {
    this.onScrollViewLayout = this.onScrollViewLayout.bind(this);

    this.value = new Animated.Value(0);
    this.nativeValue = new Animated.Value(0);
    this.nativeValue.addListener(
      _.debounce(({ value }) => {
        this.value.setValue(value);
      }),
      options.nativeScrollEventThrottle,
    );

    this.scrollViewProps = {
      onScroll: Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.nativeValue } } }],
        { useNativeDriver: false }, // TODO: figure out why this breaks when true
      ),
      scrollEventThrottle: 1,
      onLayout: this.onScrollViewLayout,
    };
  }

  onScrollViewLayout: LayoutEvent => void;
  layout: Layout;
  value: Animated.Value;
  nativeValue: Animated.Value;
  scrollViewProps: ScrollViewProps;

  onScrollViewLayout(event: LayoutEvent) {
    this.layout = event.nativeEvent.layout;
  }
}
