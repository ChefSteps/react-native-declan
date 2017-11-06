// @flow

import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Easing } from 'react-native';
import _ from 'lodash';

import {
  AnimatableView,
  Move,
  ScrollDriver,
  WhileScrolling,
  type Animator,
} from 'react-native-declan';

type State = {};
type Props = {};

class ScrollDirectionDemo extends Component<any, Props, State> {
  state: State;
  scrollDriver: ScrollDriver;
  fab: React.Element<*>;

  constructor(props: Props) {
    super(props);
    this.scrollDriver = new ScrollDriver();
  }

  getFab = () => this.fab;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{
          bottom: 0,
          flex: 1,
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        }}>
          <ScrollView
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

        <AnimatableView
          ref={ref => {
            this.fab = ref;
          }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            position: 'absolute',
            bottom: 40,
            left: Dimensions.get('window').width / 2 - 25,
            backgroundColor: 'lightblue',
            borderWidth: 2,
            borderColor: 'white',
          }}
        />

        <WhileScrolling direction="either" driver={this.scrollDriver}>
          <Move
            getTargetRef={this.getFab}
            y={100}
            duration={200}
            easing={Easing.in}
          />
        </WhileScrolling>
      </View>
    );
  }
}

export default ScrollDirectionDemo;
