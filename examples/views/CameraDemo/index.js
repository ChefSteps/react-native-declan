// @flow
/* eslint-disable react/jsx-no-bind */

import React, { Component } from 'react';
import {
  View,
  Easing,
  Text,
  Image,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import { Font } from 'expo';

import {
  Declan,
  Move,
  Fade,
  Scale,
  Change,
  StateGroup,
  State,
  WhileTrue,
  type Animator,
} from 'react-native-declan';

const styles = {
  mode: {
    width: 125,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'din1451',
    fontSize: 18,
    color: 'white',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  modesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOutline: {
    position: 'absolute',
    opacity: 0,
    transform: [
      {
        scale: 0.75,
      },
    ],
  },
  centerContainer: {
    position: 'absolute',
    height: 75,
    width: 75,
    borderRadius: 50,
  },
  buttonCenter: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  buttonTouchable: {
    width: '100%',
    height: '100%',
  },
};

type ComponentState = {
  fontLoaded: boolean,
  recording: boolean,
};
type Props = {};

class CameraDemo extends Component<any, Props, ComponentState> {
  state: ComponentState = {
    fontLoaded: false,
    recording: false,
  };

  modes: React.Element<*>;
  outlineVideo: React.Element<*>;
  outlineSlomo: React.Element<*>;
  outlineTimelapse: React.Element<*>;
  center: React.Element<*>;
  centerContainer: React.Element<*>;

  stateGroup: StateGroup;

  async componentDidMount() {
    await Font.loadAsync({
      din1451: require('./assets/din1451alt.ttf'),
    });
    this.setState({
      fontLoaded: true,
    });
  }

  render() {
    const createMode = (mode, onPress) => {
      if (this.state.fontLoaded) {
        return (
          <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.mode}>
              <Text style={styles.text}>{mode}</Text>
            </View>
          </TouchableWithoutFeedback>
        );
      }
      return null;
    };

    return (
      <View style={styles.page}>
        <Declan.View
          ref={ref => (this.modes = ref)}
          style={styles.modesContainer}
        >
          {createMode('VIDEO', () => {
            this.setState({ recording: false });
            this.stateGroup && this.stateGroup.goToState('video');
          })}
          {createMode('TIME-LAPSE', () => {
            this.setState({ recording: false });
            this.stateGroup && this.stateGroup.goToState('timelapse');
          })}
          {createMode('SLO-MO', () => {
            this.setState({ recording: false });
            this.stateGroup && this.stateGroup.goToState('slomo');
          })}
        </Declan.View>

        <View style={styles.buttonContainer}>
          <Declan.View
            ref={ref => (this.outlineVideo = ref)}
            style={styles.buttonOutline}
          >
            <Image source={require('./assets/filled.png')} />
          </Declan.View>

          <Declan.View
            ref={ref => (this.outlineSlomo = ref)}
            style={styles.buttonOutline}
          >
            <Image source={require('./assets/slo-mo.png')} />
          </Declan.View>

          <Declan.View
            ref={ref => (this.outlineTimelapse = ref)}
            style={styles.buttonOutline}
          >
            <Image source={require('./assets/time-lapse.png')} />
          </Declan.View>

          <Declan.View
            ref={ref => (this.centerContainer = ref)}
            style={styles.centerContainer}
          >
            <Declan.View
              ref={ref => (this.center = ref)}
              style={styles.buttonCenter}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  this.setState({ recording: !this.state.recording });
                }}
              >
                <View style={styles.buttonTouchable} />
              </TouchableWithoutFeedback>
            </Declan.View>
          </Declan.View>
        </View>

        <StateGroup
          ref={ref => {
            this.stateGroup = ref;
          }}
          defaultState="timelapse"
        >
          <State name="video">
            <Fade
              getTargetRef={() => this.outlineVideo}
              value={1}
              duration={500}
            />
            <Change
              getTargetRef={() => this.center}
              field="backgroundColor"
              initialValue="white"
              value="red"
              duration={500}
            />
            <Move getTargetRef={() => this.modes} x={125} duration={100} />
          </State>
          <State name="timelapse">
            <Fade
              getTargetRef={() => this.outlineTimelapse}
              value={1}
              duration={500}
            />
          </State>
          <State name="slomo">
            <Fade
              getTargetRef={() => this.outlineSlomo}
              value={1}
              duration={500}
            />
            <Move getTargetRef={() => this.modes} x={-125} duration={100} />
          </State>
        </StateGroup>

        <WhileTrue value={this.state.recording}>
          <Scale
            getTargetRef={() => this.centerContainer}
            x={0.7}
            y={0.7}
            duration={300}
            easing={Easing.linear}
          />
          <Change
            getTargetRef={() => this.center}
            field="borderRadius"
            initialValue={50}
            value={15}
            duration={300}
            easing={Easing.linear}
          />
        </WhileTrue>
      </View>
    );
  }
}

export default CameraDemo;
