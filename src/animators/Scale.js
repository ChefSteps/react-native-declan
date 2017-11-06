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
  factor: number,
  x: number,
  y: number,
} & BaseAnimatorProps &
  TimingAnimatorProps &
  DriverAnimatorProps;

class Scale extends BaseAnimator<any, Props, State> {

  state: {};

  getAnimationTransformation = () => {
    const initial: { x: number, y: number } = this.props.initialValue;
    const destination: { x: number, y: number } = this.getDestinationValue();
    const outputRange: { x: Array<number>, y: Array<number> } = {
      x: [initial.x, destination.x],
      y: [initial.y, destination.y],
    };

    return {
      transform: [
        {
          scaleX: this.progress.interpolate({
            inputRange: [0, 1],
            outputRange: outputRange.x,
            extrapolate: this.props.extrapolate,
            extrapolateLeft: this.props.extrapolateLeft,
            extrapolateRight: this.props.extrapolateRight,
          }),
        },
        {
          scaleY: this.progress.interpolate({
            inputRange: [0, 1],
            outputRange: outputRange.y,
            extrapolate: this.props.extrapolate,
            extrapolateLeft: this.props.extrapolateLeft,
            extrapolateRight: this.props.extrapolateRight,
          }),
        },
      ],
    };
  }

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
  extrapolate: 'clamp',
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
};

export default Scale;
