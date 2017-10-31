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
  degrees: number,
  degreesX: number,
  degreesY: number,
  degreesZ: number,
} & BaseAnimatorProps &
  TimingAnimatorProps;

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
      const driver = new Animated.Value(0);
      this.driverValue.addListener(({ value }) => {
        driver.setValue(value);
      });

      const initial : number = this.getInitialValue();
      const destination: number = this.getDestinationValue();

      return {
        transform: [
          {
            [field]: this.driverValue.interpolate({
              inputRange: this.driverInputRange,
              outputRange: [initial, destination],
              extrapolate: 'clamp',
            }).interpolate({
              inputRange: [0, 360],
              outputRange: ['0deg', '360deg'],
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
};

export default Rotate;
