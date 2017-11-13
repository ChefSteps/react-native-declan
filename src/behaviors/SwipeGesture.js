// @flow

import React, { Component } from 'react';
import { Animated, Easing } from 'react-native';
import EventEmitter from 'eventemitter3';
import { reduce, keys, values, forEach } from 'ramda';

import PanEventEmitter from '../drivers/PanEventEmitter';
import { Layout, LayoutEvent } from '../types';

export const SwipeDirection = {
  up: 'up',
  down: 'down',
  left: 'left',
  right: 'right',
};

export const Edge = {
  left: 'left',
  right: 'right',
  top: 'top',
  bottom: 'bottom',
};

export const SwipeType = {
  active: 'active',
  // TODO: haven't really come across a need for these, so putting it off for nowa
  // auto: 'auto',
  // simple: 'simple',
};

const VELOCITY_THRESHOLD = 0.1;
const SLOW_DURATION = 300;
const MAX_DURATION = 3000;

type State = {
  layout: Layout,
  isActive: boolean,
};
type Props = {
  panEventEmitter: PanEventEmitter,
  direction: $Keys<typeof SwipeDirection>,
  length: number,
  type: $Keys<typeof SwipeType>,
  isActive: ?boolean,
  edge?: $Keys<typeof Edge>,
  hitSize?: number,
};

export default class SwipeGesture extends Component<any, Props, State> {
  state: State = {};
  panEventEmitter: PanEventEmitter
  panAmount: Animated.ValueXY;
  finishAnimation: Animated.Value;
  directionAnimationProgress: { [string]: Animated.Value };

  // publicly accessible
  progress: Animated.Value;
  swipeStateEmitter: EventEmitter;

  constructor(props: Props) {
    super(props);
    this.panEventEmitter = props.panEventEmitter;

    this.swipeStateEmitter = new EventEmitter();
    this.swipeStateEmitter.emit('isActive', props.isActive);

    this.panAmount = new Animated.ValueXY();
    props.isActive && this.panAmount.setValue({
      x: props.length,
      y: 0
    });

    this.progress = this.panAmount.x.interpolate({
      inputRange: [0, props.length],
      outputRange: [0, 1],
      extrapolate: 'extend'
    });

    this.panEventEmitter.on('onLayout', this._onLayout);
    this.panEventEmitter.on('onPanResponderGrant', this._onPanResponderGrant);

    this.panEventEmitter.setShouldRespondHandler(this._shouldRespond);
  }

  componentDidMount() {
    this.setState({
      isActive: this.props.isActive
    });
  }

  setSwipeActive(active) {
    Animated.timing(this.panAmount, {
      toValue: {
        x: active ? this.props.length : 0,
        y: 0
      },
      duration: SLOW_DURATION,
      easing: Easing.inOut(Easing.ease),
    }).start(this._onGestureCompleted);
  }

  _onLayout = ({event}) => {
    this.setState({ layout: event.nativeEvent.layout});
  }

  _shouldRespond = (event, gestureState) => {
    const { edge, hitSize } = this.props;
    const { locationX, locationY } = event.nativeEvent;

    const edgeDetector = {
      left: () => locationX < hitSize,
      right: () => locationX > (this.state.layout.width - hitSize),
      top: () => locationY < hitSize,
      bottom: () => locationY > (this.state.layout.height - hitSize),
    }[edge];

    return (!edgeDetector || edgeDetector());
  }

  _onPanResponderGrant = ({event, gestureState}) => {
    if (this._shouldRespond(event, gestureState)) {
      this.panAmount.setOffset({x: this.panAmount.x._value, y: this.panAmount.y._value});
      this.panAmount.setValue({x: 0, y: 0});

      this.panEventEmitter.addListener('onPanResponderMove', this._onPanResponderMove);
      this.panEventEmitter.addListener('onPanResponderRelease', this._onPanResponderRelease);
    }
  }

  _onPanResponderMove = ({event, gestureState}) => {

    // clone the gestureState and "rotate" it so that positive-X
    // is the gesture being tracked
    const fixedGestureState = Object.assign({}, gestureState);
    const gestureRotators = {
      left: () => { fixedGestureState.dx = -gestureState.dx },
      right: () => { fixedGestureState.dx = gestureState.dx },
      up: () => { fixedGestureState.dx = -gestureState.dy },
      down: () => { fixedGestureState.dx = gestureState.dy },
    }[this.props.direction]();

    Animated.event([
      null, // raw event arg ignored
      { dx: this.panAmount.x },
    ])(event, fixedGestureState);
  }

  _onGestureCompleted = ({finished = false}) => {
    if (finished) {
      const newIsActive = this.panAmount.x._value === this.props.length;
      this.swipeStateEmitter.emit('isActive', newIsActive);
      this.setState({
        isActive: newIsActive
      });
      this.panEventEmitter.removeListener('onPanResponderMove', this._onPanResponderMove);
      this.panEventEmitter.removeListener('onPanResponderRelease', this._onPanResponderRelease);
    }
  }

  _onPanResponderRelease = ({event, gestureState}) => {
    const { dx, dy, vx, vy } = gestureState;
    const { isActive } = this.state;
    const { direction, length } = this.props;

    this.panAmount.flattenOffset();
    const velocity = {
      left: -vx,
      right: vx,
      up: -vy,
      down: vy,
    }[direction];

    const swipeThreshold = length / 2;

    // moving rapidly to inactive
    if (velocity < -VELOCITY_THRESHOLD) {
      let panAmount = this.panAmount.x._value;
      if (panAmount > length) panAmount = length;
      if (panAmount < 0) panAmount = 0;
      const pctProgress = 1 - panAmount / length;
      const distance = (1 - pctProgress) * length;
      const duration = Math.min(MAX_DURATION, distance / Math.abs(velocity));

      Animated.timing(this.panAmount, {
        toValue: {x: 0, y: 0},
        duration: duration,
        easing: Easing.out(Easing.ease),
      }).start(this._onGestureCompleted);

    // moving rapidly to active
    } else if (Math.abs(velocity) > VELOCITY_THRESHOLD) {
      let panAmount = this.panAmount.x._value;
      if (panAmount > length) panAmount = length;
      if (panAmount < 0) panAmount = 0;
      const pctProgress = panAmount / length;
      const distance = (1 - pctProgress) * length;
      const duration = Math.min(MAX_DURATION, distance / Math.abs(velocity));

      Animated.timing(this.panAmount, {
        toValue: {x: length, y: 0},
        duration: duration,
        easing: Easing.out(Easing.ease),
      }).start(this._onGestureCompleted);

    // going to active
    } else if (this.panAmount.x._value > swipeThreshold) {
      this.setSwipeActive(true);

    // going to inactive
    } else if (this.panAmount.x._value <= swipeThreshold) {
      this.setSwipeActive(false);
    }
  }

  componentWillUnmount() {
    this.panEventEmitter.removeListener('onPanResponderMove', this._onPanResponderMove);
    this.panEventEmitter.removeListener('onPanResponderRelease', this._onPanResponderRelease);
  }

  render() {
    return null;
  }
}

SwipeGesture.defaultProps = {
  isActive: false,
  type: 'active',
  length: 100,
  hitSize: 20,
};
