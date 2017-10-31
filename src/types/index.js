// @flow

import { Animated, Easing } from 'react-native';
import AnimatableView from '../components/AnimatableView';

export type AnimatedValue = Animated.Value | Animated.ValueXY;

export interface Animator {
  id: string,
  target: ?AnimatableView,
  value: AnimatedValue,
  start(): void,
  stop(): void,
  reset(): void,
}

export type BaseAnimatorProps = {
  getTargetRef: () => AnimatableView,
  initialValue?: number | { x: number, y: number },
  onFinish?: () => void,
  onFinishBack?: () => void,
};

export type TimingAnimatorProps = {
  duration: number,
  durationBack?: number,
  delay: number,
  delayBack?: number,
  easing: typeof Easing.linear,
  easingBack?: typeof Easing.linear,
};

export interface Driver {
  value: Animated.Value,
}
