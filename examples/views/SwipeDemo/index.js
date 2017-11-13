// @flow
/* eslint-disable react/jsx-no-bind */

import React, { Component } from 'react';
import { View, Text, Image, Button, Easing, Dimensions } from 'react-native';

import {
  Declan,
  Move,
  Fade,
  Scale,
  SwipeGesture,
  SwipingAnimation,
  PanEventEmitter,
  Swiped,
  DebugAction,
  Callback,
  type Animator,
} from 'react-native-declan';

type State = {};
type Props = {};

const shadowProps = {
  shadowColor: 'black',
  shadowOffset: {
    height: 0,
    width: 0,
  },
  shadowOpacity: 0.2,
  shadowRadius: 5,
};

const styles = {
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#93adbd',
  },
  cardContainer: {},
  card: {
    width: 200,
    height: 300,
    borderRadius: 5,
    ...shadowProps,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: 5,
  },
  bottomCard: {
    position: 'absolute',
    width: 200,
    height: 300,
    borderRadius: 5,
    backgroundColor: 'white',
    ...shadowProps,
  },
  bottomContent: {
    position: 'absolute',
    height: 110,
    width: '100%',
    bottom: 0,
    left: 0,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardDescription: {
    width: '100%',
    fontSize: 13,
    color: 'darkgrey',
    textAlign: 'center',
  },
  faces: {
    margin: 10,
    flexDirection: 'row',
  },
  face: {
    margin: -5,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
  bottomRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  circles: {
    padding: 5,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 4,
    height: 4,
    margin: 2,
    borderRadius: 3,
    backgroundColor: 'darkgrey',
  },
  menu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: Dimensions.get('window').width,
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  closeButton: {
    color: 'white',
  },
};

class SwipeDemo extends Component<any, Props, State> {
  state: State;

  page: React.Element<*>;

  menu: React.Element<*>;
  menuOpenPanEventEmitter: PanEventEmitter;
  menuOpenSwipeGesture: SwipeGesture;
  menuClosePanEventEmitter: PanEventEmitter;
  menuCloseSwipeGesture: SwipeGesture;

  card: React.Element<*>;
  bottomCard: React.Element<*>;

  cardPanEventEmitter: PanEventEmitter;
  cardSwipeGesture: SwipeGesture;

  constructor(props: Props) {
    super(props);
    this.cardPanEventEmitter = new PanEventEmitter();
    this.menuOpenPanEventEmitter = new PanEventEmitter();
    this.menuClosePanEventEmitter = new PanEventEmitter();
  }

  render() {
    return (
      <Declan.View
        ref={ref => {
          this.page = ref;
        }}
        style={styles.page}
        {...this.menuOpenPanEventEmitter.viewProps}
      >
        <View style={styles.cardContainer}>
          <Declan.View
            ref={ref => {
              this.bottomCard = ref;
            }}
            style={styles.bottomCard}
          >
            <View style={styles.bottomContent}>
              <Text style={styles.cardDescription}>
                A silver lake in the north of Canada.
              </Text>
              <View style={styles.bottomRow}>
                <View style={styles.faces}>
                  <Image
                    style={styles.face}
                    source={require('./assets/faces/model-001.jpg')}
                    resizeMode="cover"
                  />
                  <Image
                    style={styles.face}
                    source={require('./assets/faces/model-002.jpg')}
                    resizeMode="cover"
                  />
                  <Image
                    style={styles.face}
                    source={require('./assets/faces/model-003.jpg')}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.circles}>
                  <View style={styles.circle} />
                  <View style={styles.circle} />
                  <View style={styles.circle} />
                </View>
              </View>
            </View>
          </Declan.View>

          <Declan.View
            ref={ref => {
              this.card = ref;
            }}
            style={styles.card}
            {...this.cardPanEventEmitter.viewProps}
          >
            <Image
              style={styles.cardImage}
              source={require('./assets/Canada.png')}
              resizeMode="cover"
            />
          </Declan.View>
        </View>

        <Declan.View
          ref={ref => {
            this.menu = ref;
          }}
          style={styles.menu}
          {...this.menuClosePanEventEmitter.viewProps}
        >
          <Button
            style={styles.closeButton}
            onPress={() => {
              this.menuOpenSwipeGesture.setSwipeActive(false);
              this.menuCloseSwipeGesture.setSwipeActive(false);
            }}
            title="Close"
          />
        </Declan.View>

        <SwipeGesture
          ref={ref => {
            this.cardSwipeGesture = ref;
          }}
          panEventEmitter={this.cardPanEventEmitter}
          direction="up"
          length={150}
        />

        <SwipingAnimation getSourceRef={() => this.cardSwipeGesture}>
          <Move getTargetRef={() => this.card} y={-85} />
          <Scale getTargetRef={() => this.bottomCard} x={1.2} y={1.2} />
          <Move getTargetRef={() => this.bottomCard} y={20} />
        </SwipingAnimation>

        <SwipeGesture
          ref={ref => {
            this.menuOpenSwipeGesture = ref;
          }}
          panEventEmitter={this.menuOpenPanEventEmitter}
          edge="right"
          hitSize={40}
          direction="left"
          length={200}
        />

        <SwipingAnimation getSourceRef={() => this.menuOpenSwipeGesture}>
          <Move getTargetRef={() => this.page} x={-200} />
          <Fade getTargetRef={() => this.page} initialValue={1} value={0.5} />
        </SwipingAnimation>

        <SwipeGesture
          ref={ref => {
            this.menuCloseSwipeGesture = ref;
          }}
          panEventEmitter={this.menuClosePanEventEmitter}
          direction="right"
          length={200}
        />

        <SwipingAnimation getSourceRef={() => this.menuCloseSwipeGesture}>
          <Move getTargetRef={() => this.page} x={200} />
        </SwipingAnimation>
        <Swiped getSourceRef={() => this.menuCloseSwipeGesture}>
          <Callback
            action={() => {
              this.menuOpenSwipeGesture.setSwipeActive(false);
              this.menuCloseSwipeGesture.setSwipeActive(false);
            }}
          />
        </Swiped>
      </Declan.View>
    );
  }
}

export default SwipeDemo;
