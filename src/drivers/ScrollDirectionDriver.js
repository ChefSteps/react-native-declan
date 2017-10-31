// @flow

import { Animated } from 'react-native';
import _ from 'lodash';
import EventEmitter from 'eventemitter3';

import { Driver } from '../types';

type Options = {
  useNativeDriver?: boolean,
  nativeScrollEventThrottle: number,
};

type ScrollViewProps = {
  onScroll: Animated.event,
  scrollEventThrottle: number,
  onMomentumScrollEnd: () => void,
  onMomentumScrollBegin: () => void,
  onScrollEndDrag: () => void,
  onScrollBeginDrag: () => void,
};

export type ScrollDirection = 'UP' | 'DOWN' | 'NONE';

export default class ScrollDirectionDriver implements Driver {
  scrolling: boolean = false;
  currentPosition: number = 0;
  scrollDirection: ScrollDirection;
  scrollDirectionEmitter: EventEmitter = new EventEmitter();

  constructor(
    options: Options = {
      nativeScrollEventThrottle: 20,
    },
  ) {
    this.onScrollBegin = this.onScrollBegin.bind(this);
    this.onScrollEnd = this.onScrollEnd.bind(this);
    this.value = new Animated.Value(this.currentPosition);
    this.value.addListener(
      _.debounce(({ value }) => {
        if (this.scrolling) {
          this.setDirection(value < this.currentPosition ? 'UP' : 'DOWN');
        }
        this.currentPosition = value;
      }),
      options.nativeScrollEventThrottle,
    );
    this.setDirection('NONE');

    this.scrollViewProps = {
      onScroll: Animated.event(
        [{ nativeEvent: { contentOffset: { y: this.value } } }],
        { useNativeDriver: false }, // TODO: figure out why this breaks when true
      ),
      scrollEventThrottle: 1,
      onMomentumScrollEnd: this.onScrollEnd,
      onMomentumScrollBegin: this.onScrollBegin,
      onScrollEndDrag: this.onScrollEnd,
      onScrollBeginDrag: this.onScrollBegin,
    };
  }

  value: Animated.Value;
  scrollViewProps: ScrollViewProps;
  onScrollBegin: () => void;
  onScrollEnd: () => void;

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
