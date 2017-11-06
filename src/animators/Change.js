// @flow

import { isNil } from 'ramda';
import { Animated, Easing } from 'react-native';
import BaseAnimator from './BaseAnimator';
import type {
  BaseAnimatorProps,
  TimingAnimatorProps,
  DriverAnimatorProps
} from '../types';

type State = {};

type Props = {
  field: string,
  value: any,
} & BaseAnimatorProps &
  TimingAnimatorProps &
  DriverAnimatorProps;

class Change extends BaseAnimator<any, Props, State> {

  state = {};

  getAnimationTransformation = () => {
    return {
      [this.props.field]: this.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [this.props.initialValue, this.props.value],
        extrapolate: this.props.extrapolate,
        extrapolateLeft: this.props.extrapolateLeft,
        extrapolateRight: this.props.extrapolateRight,
      })
    };
  };

  shouldUseNativeDriver = () => false;
}

Change.defaultProps = {
  duration: 100,
  delay: 0,
  easing: Easing.linear,
  extrapolate: 'clamp',
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
};

export default Change;
