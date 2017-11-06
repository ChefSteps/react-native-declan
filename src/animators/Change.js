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

  // $FlowFixMe
  value: Animated.Value;
  // $FlowFixMe
  driverValue: Animated.Value;
  state = {};

  constructor(props: Props) {
    super(props);
    this.value = new Animated.Value(this.getInitialValue());
    this.reset();
  }

  reset = () => {
    this.value.setValue(this.getInitialValue());
  }

  getAnimationTransformation = () => {
    if (!isNil(this.driverValue)) {
      return {
        [this.props.field]: this.driverValue.interpolate({
          inputRange: [0, 1],
          outputRange: [this.props.initialValue, this.props.value],
          extrapolate: this.props.extrapolate,
          extrapolateLeft: this.props.extrapolateLeft,
          extrapolateRight: this.props.extrapolateRight,
        })
      };
    }

    return {
      [this.props.field]: this.value.interpolate({
        inputRange: [0,1],
        outputRange: [this.props.initialValue, this.props.value],
      })
    };
  };

  getDestinationValue = () => 1;
  getInitialValue = () => 0;
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
