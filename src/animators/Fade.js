// @flow

import { isNil } from 'ramda';
import { Animated, Easing } from 'react-native';
import BaseAnimator from './BaseAnimator';
import type {
  BaseAnimatorProps,
  TimingAnimatorProps,
} from '../types';

type State = {};

type Props = {
  value: number,
} & BaseAnimatorProps &
  TimingAnimatorProps;

class Fade extends BaseAnimator<any, Props, State> {

  // $FlowFixMe
  value: Animated.ValueXY;
  // $FlowFixMe
  driverValue: Animated.Value;
  state: {};

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
      const initial : number = this.getInitialValue();
      const destination: number = this.getDestinationValue();

      return {
        opacity: this.driverValue.interpolate({
          inputRange: [0, 1],
          outputRange: [initial, destination],
          extrapolate: 'clamp',
        })
      };
    }
    return {
      opacity: this.value,
    };
  }

  getDestinationValue = () => this.props.value;
}

Fade.defaultProps = {
  initialValue: 0,
  value: 1,
  duration: 100,
  delay: 0,
  easing: Easing.linear,
};

export default Fade;
