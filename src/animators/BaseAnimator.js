// @flow

import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import uuid from 'uuid';

import AnimatableView from '../components/AnimatableView';
import { Animator, type AnimatedValue } from '../types';

class BaseAnimator<D, P: any, S> extends Component<D, P, S>
  implements Animator {
  static defaultProps: $Abstract<D>;

  state: $Abstract<S>;

  getDestinationValue: $Abstract<() => any>;
  getAnimationTransformation: $Abstract<() => Object>;
  reset: $Abstract<() => void>;

  id: string;
  target: ?AnimatableView;
  value: AnimatedValue;
  driverValue: ?AnimatedValue;

  props: P;

  constructor(props: P) {
    super(props);
    this.id = uuid.v4();
    if (props.driverValue) {
      this.driverValue = Object.create(props.driverValue);
    }
  }

  componentDidMount() {
    this.target = this.props.getTargetRef();
    this.target.registerAnimationTransformation(
      // $FlowFixMe
      this.getAnimationTransformation(),
    );
  }

  getInitialValue() {
    return this.props.initialValue;
  }

  shouldUseNativeDriver = () => true;

  start() {
    this.value.stopAnimation();
    Animated.timing(this.value, {
      // $FlowFixMe
      toValue: this.getDestinationValue(),
      duration: this.props.duration,
      delay: this.props.delay,
      easing: this.props.easing,
      useNativeDriver: this.shouldUseNativeDriver(),
    }).start(({finished}) => this.props.onFinish && this.props.onFinish({finished}));
  }

  stop() {
    this.value.stopAnimation();
    Animated.timing(this.value, {
      toValue: this.getInitialValue(),
      duration: this.props.durationBack || this.props.duration,
      delay: this.props.delayBack || this.props.delay,
      easing: this.props.easingBack || this.props.easing,
      useNativeDriver: this.shouldUseNativeDriver(),
    }).start(({finished}) => this.props.onFinishBack && this.props.onFinishBack({finished}));
  }

  render() {
    return (
      <View>
        {this.props.children}
      </View>
    );
  }
}

export default BaseAnimator;
