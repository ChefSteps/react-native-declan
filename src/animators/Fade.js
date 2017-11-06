// @flow

import { isNil } from 'ramda';
import { Animated, Easing } from 'react-native';
import BaseAnimator from './BaseAnimator';
import type {
  BaseAnimatorProps,
  TimingAnimatorProps,
  DriverAnimatorProps,
} from '../types';

type State = {};

type Props = {
  value: number,
} & BaseAnimatorProps &
  TimingAnimatorProps &
  DriverAnimatorProps;

class Fade extends BaseAnimator<any, Props, State> {

  state: {};

  getAnimationTransformation = () => {
    const initial : number = this.props.initialValue;
    const destination: number = this.props.value;
    return {
      opacity: this.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [initial, destination],
        extrapolate: this.props.extrapolate,
        extrapolateLeft: this.props.extrapolateLeft,
        extrapolateRight: this.props.extrapolateRight,
      })
    };
  }
}

Fade.defaultProps = {
  initialValue: 0,
  value: 1,
  duration: 100,
  delay: 0,
  easing: Easing.linear,
  extrapolate: 'clamp',
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
};

export default Fade;
