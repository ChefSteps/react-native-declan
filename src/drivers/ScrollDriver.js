// @flow

/* This borrows heavily from the shoutem/animation library */

import { Animated } from 'react-native';
import _ from 'lodash';
import EventEmitter from 'eventemitter3';

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
  onMomentumScrollEnd: () => void,
  onMomentumScrollBegin: () => void,
  onScrollEndDrag: () => void,
  onScrollBeginDrag: () => void,
};

export type ScrollDirection = 'UP' | 'DOWN' | 'NONE';

/*
 * @param options Driver options
 * @param options.nativeScrollEventThrottle Native animated value changes
 *   will be debounced using this value when mirroring them to the JS value.
 *   Defaults to 20ms.
 */
export default class ScrollDriver implements Driver {
  scrolling: boolean = false;
  currentPosition: number = 0;
  scrollDirection: ScrollDirection;
  scrollDirectionEmitter: EventEmitter = new EventEmitter();

  constructor(
    options: Options = {
      nativeScrollEventThrottle: 20,
    },
  ) {
    this.onScrollViewLayout = this.onScrollViewLayout.bind(this);
    this.onScrollBegin = this.onScrollBegin.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);

    this.value = new Animated.Value(0);
    this.value.addListener(({ value }) => {
      if (this.scrolling) {
        this.setDirection(value < this.currentPosition ? 'UP' : 'DOWN');
      }
      this.currentPosition = value;
    });
    this.setDirection('NONE');

    this.scrollViewProps = {
      onScroll: Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.value } } }],
        { useNativeDriver: false },
      ),
      scrollEventThrottle: 1,
      onLayout: this.onScrollViewLayout,
      onMomentumScrollEnd: this.onScrollEnd,
      onMomentumScrollBegin: this.onScrollBegin,
      onScrollEndDrag: this.onScrollEnd,
      onScrollBeginDrag: this.onScrollBegin,
    };
  }

  onScrollViewLayout: LayoutEvent => void;
  layout: Layout;
  value: Animated.Value;
  scrollViewProps: ScrollViewProps;
  onScrollBegin: () => void;
  onScrollEnd: () => void;

  onScrollViewLayout(event: LayoutEvent) {
    this.layout = event.nativeEvent.layout;
  }

  setDirection(newDirection: ScrollDirection) {
    if (newDirection !== this.scrollDirection) {
      this.scrollDirection = newDirection;
      this.scrollDirectionEmitter.emit('directionChanged', newDirection);
    }
  }

  onScrollEnd() {
    this.scrolling = false;
    this.setDirection('NONE');
  }

  onScrollBegin() {
    this.scrolling = true;
  }
}
