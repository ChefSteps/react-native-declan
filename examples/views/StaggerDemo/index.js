// @flow
/* eslint-disable react/jsx-no-bind */

import React, { Component } from 'react';
import { Text, View, Easing, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balls: {
    height: 200,
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const rawStyles = {
  ball: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: 'lightblue',
    borderWidth: 1,
    borderColor: 'white',
  },
};

import {
  Declan,
  Move,
  Stagger,
  type Animator,
} from 'react-native-declan';

type State = {};
type Props = {};

class StaggerDemo extends Component<any, Props, State> {
  state: State;

  ref1: React.Element<*>;
  ref2: React.Element<*>;
  ref3: React.Element<*>;
  ref4: React.Element<*>;

  trigger: Animator;

  render() {
    return (
      <View style={styles.page}>

        <View style={styles.balls}>
          <Declan.View
            ref={ref => { this.ref1 = ref; }}
            style={rawStyles.ball}
          />
          <Declan.View
            ref={ref => { this.ref2 = ref; }}
            style={rawStyles.ball}
          />
          <Declan.View
            ref={ref => { this.ref3 = ref; }}
            style={rawStyles.ball}
          />
          <Declan.View
            ref={ref => { this.ref4 = ref; }}
            style={rawStyles.ball}
          />
        </View>

        <Button
          onPress={() => {
            // this.trigger.reset();
            this.trigger.start();
          }}
          title="Start"
        />
        <Button
          onPress={() => {
            this.trigger.stop();
          }}
          title="Stop"
        />

        <Stagger
          ref={ref => { this.trigger = ref; }}
          y={-100}
          duration={1000}
          easing={Easing.bounce}
          eachDelay={500}
        >
          <Move getTargetRef={() => this.ref1} />
          <Move getTargetRef={() => this.ref2} />
          <Move getTargetRef={() => this.ref3} />
          <Move getTargetRef={() => this.ref4} />
        </Stagger>
      </View>
    );
  }
}

export default StaggerDemo;
