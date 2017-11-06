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

  getAnimationTransformation: $Abstract<() => Object>;

  id: string;
  target: ?AnimatableView;
  progress: AnimatedValue;

  props: P;

  constructor(props: P) {
    super(props);
    this.id = uuid.v4();
    this.progress = new Animated.Value(0);
    if (props.driverValue) {
      this.progress = Object.create(props.driverValue);
    }
  }

  componentDidMount() {
    this.target = this.props.getTargetRef();
    this.target.registerAnimationTransformation(
      // $FlowFixMe
      this.getAnimationTransformation(),
    );
  }

  reset = () => {
    this.progress.setValue(0);
  }

  shouldUseNativeDriver = () => true;

  start() {
    this.progress.stopAnimation();
    Animated.timing(this.progress, {
      // $FlowFixMe
      toValue: 1,
      duration: this.props.duration,
      delay: this.props.delay,
      easing: this.props.easing,
      useNativeDriver: this.shouldUseNativeDriver(),
    }).start(({finished}) => this.props.onFinish && this.props.onFinish({finished}));
  }

  stop() {
    this.progress.stopAnimation();
    Animated.timing(this.progress, {
      toValue: 0,
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
