// @flow

import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import _ from 'lodash';

import {
  Declan,
  ScrollDriver,
  ScrollPositionAnimation,
  Move,
  Fade,
  Change,
  type Animator,
} from 'react-native-declan';

type State = {};
type Props = {};

class ScrollAnimationDemo extends Component<any, Props, State> {
  state: State;
  scrollDriver: ScrollDriver;
  profile: React.Element<*>;

  constructor(props: Props) {
    super(props);
    this.scrollDriver = new ScrollDriver();
  }

  getProfile = () => this.profile;

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Declan.View
          ref={ref => {
            this.profile = ref;
          }}
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            position: 'absolute',
            top: 40,
            left: Dimensions.get('window').width / 2 - 75,
            backgroundColor: '#ADD8E6',
            borderWidth: 3,
            borderColor: 'white',
          }}
        />

        <View style={{
          bottom: 0,
          flex: 1,
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        }}>
          <ScrollView
            style={{ paddingTop: 200 }}
            {...this.scrollDriver.scrollViewProps}
          >
            {_.range(20).map(n =>
              <View
                key={n}
                style={{
                  height: 100,
                  margin: 5,
                  backgroundColor: '#eee',
                  borderWidth: 2,
                  borderColor: 'white',
                  borderRadius: 5,
                }}
              />,
            )}
          </ScrollView>
        </View>

        <ScrollPositionAnimation from={0} to={200} driver={this.scrollDriver}>
          <Fade getTargetRef={this.getProfile} initialValue={1} value={0} />
          <Move getTargetRef={this.getProfile} y={-100} />
          <Change
            getTargetRef={this.getProfile}
            field="backgroundColor"
            initialValue="#ADD8E6"
            value="#D7E6AC"
            extrapolateLeft="extend"
          />
        </ScrollPositionAnimation>
      </View>
    );
  }
}

export default ScrollAnimationDemo;
