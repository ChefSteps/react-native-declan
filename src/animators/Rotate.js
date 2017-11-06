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

  state: State;

  getAnimationTransformation = () => {
    let field = 'rotate';
    if (this.props.degreesX) field = 'rotateX';
    if (this.props.degreesY) field = 'rotateY';

    const initial : number = this.props.initialValue;
    const destination: number = this.getDestinationValue();

    return {
      transform: [
        {
          [field]: this.progress.interpolate({
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
