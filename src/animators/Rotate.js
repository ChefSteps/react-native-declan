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
  degrees: number,
  degreesX: number,
  degreesY: number,
  degreesZ: number,
} & BaseAnimatorProps &
  TimingAnimatorProps &
  DriverAnimatorProps;

class Rotate extends BaseAnimator<any, Props, State> {

  // $FlowFixMe
  value: Animated.Value;
  // $FlowFixMe
  driverValue: Animated.Value;
  state: State;

  constructor(props: Props) {
    super(props);
    this.value = new Animated.Value(this.getInitialValue());
    this.reset();
  }

  reset = () => {
    this.value.setValue(this.getInitialValue());
  }

  getAnimationTransformation = () => {
    let field = 'rotate';
    if (this.props.degreesX) field = 'rotateX';
    if (this.props.degreesY) field = 'rotateY';

    if (!isNil(this.driverValue)) {
      const initial : number = this.getInitialValue();
      const destination: number = this.getDestinationValue();

      return {
        transform: [
          {
            [field]: this.driverValue.interpolate({
              inputRange: [0, 1],
              outputRange: [initial, destination],
              extrapolate: this.props.extrapolate,
              extrapolateLeft: this.props.extrapolateLeft,
              extrapolateRight: this.props.extrapolateRight,
            }).interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg'],
              extrapolate: this.props.extrapolate,
              extrapolateLeft: this.props.extrapolateLeft,
              extrapolateRight: this.props.extrapolateRight,
            }),
          },
        ],
      };
    }
    return {
      transform: [
        {
          [field]: this.value.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg'],
          }),
        },
      ],
    };
  }

  getDestinationValue = () =>
    this.props.degrees ||
    this.props.degreesX ||
    this.props.degreesY ||
    this.props.degreesZ;
}

Rotate.defaultProps = {
  initialValue: 0,
  degrees: 0,
  degreesX: 0,
  degreesY: 0,
  degreesZ: 0,
  duration: 100,
  delay: 0,
  easing: Easing.linear,
  extrapolate: 'clamp',
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
};

export default Rotate;
