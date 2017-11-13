// @flow

import { PanResponder, Animated } from 'react-native';
import EventEmitter from 'eventemitter3';

import { Layout, LayoutEvent } from '../types';

export type GestureState = {
  stateID: string,
  x0: number,
  y0: number,
  dx: number,
  dy: number,
  vx: number,
  vy: number,
  moveX: number,
  moveY: number
};

export type PanEvent = {
  nativeEvent: {
    changedTouches: [],
    identifier: string,
    locationX: number,
    locationY: number,
    pageX: number,
    pageY: number,
    target: string,
    timestamp: number,
    touches: []
  }
};

export default class PanEventEmitter extends EventEmitter {
  panResponder: any;
  shouldRespondHandler: (event: PanEvent, gestureState: GestureState) => boolean;

  constructor() {
    super();

    const shouldRespondHandler = (event: PanEvent, gestureState: GestureState) => {
      return this.shouldRespondHandler && this.shouldRespondHandler(event, gestureState);
    };

    this.panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: shouldRespondHandler,

      onPanResponderGrant: (event: PanEvent, gestureState: GestureState) => {
        this.emit('onPanResponderGrant', { event, gestureState });
      },
      onPanResponderMove: (event: PanEvent, gestureState: GestureState) => {
        this.emit('onPanResponderMove', { event, gestureState });
      },
      onPanResponderTerminationRequest: () => true,
      onPanResponderRelease: (event: PanEvent, gestureState: GestureState) => {
        this.emit('onPanResponderRelease', { event, gestureState });
      },
      onPanResponderTerminate: (event: PanEvent, gestureState: GestureState) => {
        this.emit('onPanResponderTerminate', { event, gestureState });
      },
      onShouldBlockNativeResponder: (event: PanEvent, gestureState: GestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });

    this.viewProps = {
      ...this.panResponder.panHandlers,
      onLayout: this.onLayout,
    }
  }

  setShouldRespondHandler = (handler : (event: PanEvent, gestureState: GestureState) => boolean) => {
    this.shouldRespondHandler = handler;
  }

  onLayout = (event: LayoutEvent) => {
    this.emit('onLayout', {event});
  }
};
