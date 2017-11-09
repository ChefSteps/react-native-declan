// @flow
/* eslint-disable react/jsx-no-bind */

import React, { Component } from 'react';
import {
  View,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';

import {
  Declan,
  Move,
  Fade,
  Scale,
  Change,
  ScrollDriver,
  ScrollPositionAnimation,
  type Animator,
} from 'react-native-declan';

const styles = {
  page: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 65,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingLeft: 10,
  },
  backChevron: {
    fontSize: 20,
    color: 'white',
  },
  scrollViewContainer: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  scrollView: {
    paddingTop: 250,
  },
  scrollViewContent: {
    height: 2000,
    backgroundColor: 'white',
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 300,
  },
  title: {
    position: 'absolute',
    fontSize: 28,
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    marginLeft: 10,
    top: 170,
  },
  subTitle: {
    position: 'absolute',
    fontSize: 18,
    color: 'white',
    backgroundColor: 'transparent',
    marginLeft: 10,
    top: 210,
  },
};

type ComponentState = {};
type Props = {};

class MeetupDemo extends Component<any, Props, ComponentState> {
  state: ComponentState = {};
  scrollDriver: ScrollDriver;

  header: React.Element<*>;
  title: React.Element<*>;
  subTitle: React.Element<*>;
  heroImage: React.Element<*>;
  backChevron: React.Element<*>;

  constructor(props: Props) {
    super(props);
    this.scrollDriver = new ScrollDriver();
  }

  render() {
    return (
      <View style={styles.page}>

        <StatusBar
          barStyle="dark-content"
        />

        <Declan.Image
          ref={ref => { this.heroImage = ref; }}
          style={styles.heroImage}
          source={require('./assets/hero_image.jpg')}
          resizeMode="cover"
        />

        <Declan.Text
          ref={ref => { this.title = ref; }}
          style={styles.title}
        >
          Declarative Animations
        </Declan.Text>

        <Declan.Text
          ref={ref => { this.subTitle = ref; }}
          style={styles.subTitle}
        >
          ...in React Native
        </Declan.Text>

        <View style={styles.scrollViewContainer}>
          <ScrollView
            style={styles.scrollView}
            {...this.scrollDriver.scrollViewProps}
          >
            <View style={styles.scrollViewContent} />
          </ScrollView>
        </View>

        <Declan.View
          ref={ref => { this.header = ref; }}
          style={styles.header}
        >
          <Declan.Text
            ref={ref => { this.backChevron = ref; }}
            style={styles.backChevron}
          >
            Back
          </Declan.Text>
        </Declan.View>

        <ScrollPositionAnimation from={50} to={150} driver={this.scrollDriver}>
          <Change
            getTargetRef={() => this.header}
            field="backgroundColor"
            initialValue="transparent"
            value="white"
          />
          <Change
            getTargetRef={() => this.backChevron}
            field="color"
            initialValue="white"
            value="red"
          />
        </ScrollPositionAnimation>

        <ScrollPositionAnimation from={0} to={-100} driver={this.scrollDriver}>
          <Scale
            getTargetRef={() => this.heroImage}
            x={1.5}
            y={1.5}
          />
          <Move
            getTargetRef={() => this.title}
            y={-50}
          />
        </ScrollPositionAnimation>

        <ScrollPositionAnimation from={0} to={50} driver={this.scrollDriver}>
          <Move
            getTargetRef={() => this.title}
            y={-50}
          />
          <Fade
            getTargetRef={() => this.title}
            initialValue={1}
            value={0}
          />
          <Move
            getTargetRef={() => this.subTitle}
            y={-50}
          />
          <Fade
            getTargetRef={() => this.subTitle}
            initialValue={1}
            value={0}
          />
        </ScrollPositionAnimation>

      </View>
    );
  }
}

export default MeetupDemo;
