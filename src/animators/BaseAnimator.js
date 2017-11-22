// @flow

import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import uuid from 'uuid';

import Declan from '../components';
import { Animator, type AnimatedValue } from '../types';

class BaseAnimator<D, P: any, S> extends Component<D, P, S>
  implements Animator {
  static defaultProps: $Abstract<D>;

  state: $Abstract<S>;

  getAnimationTransformation: $Abstract<() => Object>;

  id: string;
  target: ?Declan.View;
  progress: AnimatedValue;

  props: P;

  constructor(props: P) {
    super(props);
    this.id = uuid.v4();
    this.progress = new Animated.Value(0);
    if (props.driverValue) {
      this.progress = props.driverValue;
    }
  }

  componentDidMount() {
    this.registerAnimationTransformation();
  }

  componentDidUpdate() {
    if (this.props.driverValue) {
      this.progress = this.props.driverValue;
    }
    this.registerAnimationTransformation();
  }

  registerAnimationTransformation = () => {
    this.target = this.props.getTargetRef ? this.props.getTargetRef() : null;
    this.target &&
      this.target.registerAnimationTransformation &&
      this.target.registerAnimationTransformation(
        this.id,
        // $FlowFixMe
        this.getAnimationTransformation(),
      );
  }

  reset = () => {
    this.progress.setValue(0);
  };

  shouldUseNativeDriver = () => true;

  start() {
    this.progress.stopAnimation && this.progress.stopAnimation();
    Animated.timing(this.progress, {
      toValue: 1,
      duration: this.props.duration,
      delay: this.props.delay,
      easing: this.props.easing,
      useNativeDriver: this.shouldUseNativeDriver(),
    }).start(
      ({ finished }) =>
        this.props.onFinish && this.props.onFinish({ finished }),
    );
  }

  stop() {
    this.progress.stopAnimation && this.progress.stopAnimation();
    Animated.timing(this.progress, {
      toValue: 0,
      duration: this.props.durationBack || this.props.duration,
      delay: this.props.delayBack || this.props.delay,
      easing: this.props.easingBack || this.props.easing,
      useNativeDriver: this.shouldUseNativeDriver(),
    }).start(
      ({ finished }) =>
        this.props.onFinishBack && this.props.onFinishBack({ finished }),
    );
  }

  render() {
    return <View>{this.props.children}</View>;
  }
}

export default BaseAnimator;
