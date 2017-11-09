
import { Animated } from 'react-native';
import createDeclanComponent from './createDeclanComponent';

export default {
  View: createDeclanComponent(Animated.View),
  Image: createDeclanComponent(Animated.Image),
  Text: createDeclanComponent(Animated.Text),
};
