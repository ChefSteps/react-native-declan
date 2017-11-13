// @flow

import React, { Component } from 'react';
import _ from 'lodash';
import {
  View,
  ScrollView,
  Dimensions,
  Easing,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Declan,
  Move,
  Rotate,
  ScrollDriver,
  WhileScrolling,
  WhileTrue,
  Parallel,
  Stagger,
  type Animator,
} from 'react-native-declan';

const styles = {
  page: {
    flex: 1,
  },
  scrollViewContainer: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  listItem: {
    height: 100,
    margin: 5,
    backgroundColor: '#eee',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 40,
    left: Dimensions.get('window').width / 2 - 30,
  },
  subFab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 45,
    left: Dimensions.get('window').width / 2 - 25,
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    opacity: 0.7,
    top: 0,
    left: Dimensions.get('window').width,
  },
};

type State = {
  menuOpen: boolean,
};
type Props = {};

class ScrollDirectionDemo extends Component<any, Props, State> {
  state: State = {
    menuOpen: false,
  };
  scrollDriver: ScrollDriver;
  buttons: { [string]: React.Element<*> } = {};
  overlay: React.Element<*>;

  constructor(props: Props) {
    super(props);
    this.scrollDriver = new ScrollDriver();
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.scrollViewContainer}>
          <ScrollView {...this.scrollDriver.scrollViewProps}>
            {_.range(20).map(n => <View key={n} style={styles.listItem} />)}
          </ScrollView>
        </View>

        <Declan.View
          ref={ref => {
            this.overlay = ref;
          }}
          style={styles.overlay}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              this.setState({ menuOpen: false });
            }}
          >
            <View style={styles.page} />
          </TouchableWithoutFeedback>
        </Declan.View>

        <TouchableWithoutFeedback
          onPress={() => this.setState({ menuOpen: !this.state.menuOpen })}
        >
          <Declan.Image
            ref={ref => {
              this.buttons['circle'] = ref;
            }}
            style={styles.subFab}
            source={require(`./assets/circle.png`)}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => this.setState({ menuOpen: !this.state.menuOpen })}
        >
          <Declan.Image
            ref={ref => {
              this.buttons['square'] = ref;
            }}
            style={styles.subFab}
            source={require(`./assets/square.png`)}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => this.setState({ menuOpen: !this.state.menuOpen })}
        >
          <Declan.Image
            ref={ref => {
              this.buttons['triangle'] = ref;
            }}
            style={styles.subFab}
            source={require(`./assets/triangle.png`)}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => this.setState({ menuOpen: !this.state.menuOpen })}
        >
          <Declan.Image
            ref={ref => {
              this.buttons['polygon'] = ref;
            }}
            style={styles.subFab}
            source={require(`./assets/polygon.png`)}
          />
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => this.setState({ menuOpen: !this.state.menuOpen })}
        >
          <Declan.Image
            ref={ref => {
              this.buttons['plus'] = ref;
            }}
            style={styles.fab}
            source={require(`./assets/plus.png`)}
          />
        </TouchableWithoutFeedback>

        <WhileScrolling direction="either" driver={this.scrollDriver}>
          <Parallel y={100} duration={200} easing={Easing.in}>
            <Move getTargetRef={() => this.buttons['plus']} />
            <Move getTargetRef={() => this.buttons['circle']} />
            <Move getTargetRef={() => this.buttons['square']} />
            <Move getTargetRef={() => this.buttons['triangle']} />
            <Move getTargetRef={() => this.buttons['polygon']} />
          </Parallel>
        </WhileScrolling>

        <WhileTrue value={this.state.menuOpen}>
          <Move
            getTargetRef={() => this.overlay}
            x={-Dimensions.get('window').width}
            duration={1}
            easing={Easing.linear}
          />
          <Rotate
            getTargetRef={() => this.buttons['plus']}
            degrees={45}
            duration={100}
            easing={Easing.in}
          />
          <Stagger eachDelay={75} duration={150} easing={Easing.in}>
            <Move
              getTargetRef={() => this.buttons['circle']}
              x={Math.cos(-(Math.PI / 2) - Math.PI / 3) * 100}
              y={Math.sin(-(Math.PI / 2) - Math.PI / 3) * 100}
            />
            <Move
              getTargetRef={() => this.buttons['square']}
              x={Math.cos(-(Math.PI / 2) - Math.PI / 9) * 100}
              y={Math.sin(-(Math.PI / 2) - Math.PI / 9) * 100}
            />
            <Move
              getTargetRef={() => this.buttons['triangle']}
              x={Math.cos(-(Math.PI / 2) + Math.PI / 9) * 100}
              y={Math.sin(-(Math.PI / 2) + Math.PI / 9) * 100}
            />
            <Move
              getTargetRef={() => this.buttons['polygon']}
              x={Math.cos(-(Math.PI / 2) + Math.PI / 3) * 100}
              y={Math.sin(-(Math.PI / 2) + Math.PI / 3) * 100}
            />
          </Stagger>
        </WhileTrue>
      </View>
    );
  }
}

export default ScrollDirectionDemo;
