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
  factor: number,
  x: number,
  y: number,
} & BaseAnimatorProps &
  TimingAnimatorProps;

class Scale extends BaseAnimator<any, Props, State> {
  // $FlowFixMe
  value: Animated.ValueXY;
  // $FlowFixMe
  driverValue: Animated.Value;
  state: {};

  constructor(props: Props) {
    super(props);
    this.value = new Animated.ValueXY();
    this.reset();
  }

  reset = () => {
    this.value.setValue(this.getInitialValue());
  };

  getAnimationTransformation = () => {
    if (!isNil(this.driverValue)) {
      const initial: { x: number, y: number } = this.getInitialValue();
      const destination: { x: number, y: number } = this.getDestinationValue();
      const outputRange: { x: Array<number>, y: Array<number> } = {
        x: [initial.x, destination.x],
        y: [initial.y, destination.y],
      };

      return {
        transform: [
          {
            scaleX: this.driverValue.interpolate({
              inputRange: [0, 1],
              outputRange: outputRange.x,
              extrapolate: 'clamp',
            }),
          },
          {
            scaleY: this.driverValue.interpolate({
              inputRange: [0, 1],
              outputRange: outputRange.y,
              extrapolate: 'clamp',
            }),
          },
        ],
      };
    }

    return {
      transform: [
        {
          scaleX: this.value.x,
        },
        {
          scaleY: this.value.y,
        },
      ],
    };
  };

  getDestinationValue = () => ({
    x: this.props.x || this.props.factor,
    y: this.props.y || this.props.factor,
  });
}

Scale.defaultProps = {
  initialValue: { x: 1, y: 1 },
  factor: 1,
  x: 1,
  y: 1,
  duration: 100,
  delay: 0,
  easing: Easing.linear,
};

export default Scale;
