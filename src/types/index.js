// @flow

import { Animated, Easing } from 'react-native';
import Declan from '../components';

export type AnimatedValue = Animated.Value | Animated.ValueXY;

export interface Animator {
  id: string,
  target: ?Declan.View,
  value: AnimatedValue,
  start(): void,
  stop(): void,
  reset(): void,
}

export type BaseAnimatorProps = {
  getTargetRef: () => Declan.View,
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

export type Extrapolation = 'extend' | 'clamp';

export type DriverAnimatorProps = {
  extrapolate: Extrapolation,
  extrapolateLeft: Extrapolation,
  extrapolateRight: Extrapolation,
};

export interface Driver {
  value: Animated.Value,
}

export type Layout = {
  x: number,
  y: number,
  width: number,
  height: number,
};

export type LayoutEvent = {
  nativeEvent: { layout: Layout },
};
