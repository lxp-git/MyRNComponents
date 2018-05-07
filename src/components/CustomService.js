import React, {
  Component,
} from 'react'
import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  View
} from 'react-native'
import RootSiblings from 'react-native-root-siblings'
import Resources from '../utilities/Resources'
import Touchable from './Touchable'
import { SCREEN_WIDTH } from '../utilities/Constants'

var CIRCLE_SIZE = 54
var styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    right: 0,
    bottom: CIRCLE_SIZE,
  },
})

export default class CustomService {

  constructor (dispatch) {
    this.dispatch = dispatch

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    })
    this.animatedValue = new Animated.Value(0)
    this._previousRight = global._previousRight ? global._previousRight : 0
    this._previousBottom = global._previousBottom ? global._previousBottom : CIRCLE_SIZE
    this._circleStyles = {
      style: {
        right: global._previousRight ? global._previousRight : 0,
        bottom: global._previousBottom ? global._previousBottom : CIRCLE_SIZE,
      }
    }

    console.log('global._previousRight=', global._previousRight)
  }

  hide = () => {
    if (this.rootSiblings) {
      this.rootSiblings.destroy()
    } else {

    }
  }

  show = () => {
    let right = global._previousRight ? global._previousRight : 0
    let bottom = global._previousBottom ? global._previousBottom : CIRCLE_SIZE
    this.rootSiblings = new RootSiblings(
      <Animated.View
        ref={(circle) => {
          this.circle = circle
        }}
        style={{
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          borderRadius: CIRCLE_SIZE / 2,
          position: 'absolute',
          right: right,
          bottom: bottom,
          transform: [
            {
              translateX: this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 370],
              }),
            }, // y轴移动
          ],
        }}
        {...this._panResponder.panHandlers}
      >
        <Touchable onPress={() => {

        }}>
          <Image source={Resources.images.ic_service}/>
        </Touchable>
      </Animated.View>
    )
    return this.rootSiblings
  }

  _highlight = () => {
    // this._circleStyles.style.backgroundColor = 'blue'
    // this._updateNativeStyles()
  }

  _unHighlight = () => {
    // this._circleStyles.style.backgroundColor = 'green'
    // this._updateNativeStyles()
  }

  _updateNativeStyles = () => {
    this.circle && this.circle.setNativeProps(this._circleStyles)
  }

  _handleStartShouldSetPanResponder = (e: Object, gestureState: Object) => {
    // Should we become active when the user presses down on the circle?
    return true
  }

  _handleMoveShouldSetPanResponder = (e: Object, gestureState: Object) => {
    // Should we become active when the user moves a touch over the circle?
    return true
  }

  _handlePanResponderGrant = (e: Object, gestureState: Object) => {
    // this._highlight()
  }

  _handlePanResponderMove = (e: Object, gestureState: Object) => {
    this._circleStyles.style.right = this._previousRight - gestureState.dx
    this._circleStyles.style.bottom = this._previousBottom - gestureState.dy

    this._updateNativeStyles()
  }

  _handlePanResponderEnd = (e: Object, gestureState: Object) => {
    // this._unHighlight()

    if (Math.abs(this._circleStyles.style.right) > (SCREEN_WIDTH / 2) + (CIRCLE_SIZE / 2)) {


      // const toValue = 1;
      // Animated.spring(
      //   this.animatedValue,
      //   {
      //     toValue: 1,
      //     useNativeDriver: true,
      //   }
      // ).start(()=>{
      //   this._circleStyles.style.right = SCREEN_WIDTH - CIRCLE_SIZE
      //   this._previousRight = SCREEN_WIDTH - CIRCLE_SIZE;
      //   this._updateNativeStyles()
      // })
      this._circleStyles.style.right = SCREEN_WIDTH - CIRCLE_SIZE
      this._previousRight = SCREEN_WIDTH - CIRCLE_SIZE
      this._updateNativeStyles()

    } else {
      // Animated.spring(
      //   this.animatedValue,
      //   {
      //     toValue: 0,
      //     useNativeDriver: true,
      //   }
      // ).start(()=>{
      //   this._circleStyles.style.right = 0
      //   this._previousRight = 0;
      //   this._updateNativeStyles()
      // })
      this._circleStyles.style.right = 0
      this._previousRight = 0
      this._updateNativeStyles()

    }

    console.log('this._previousRight - gestureState.dx:', this._previousRight - gestureState.dx)
    if (this._previousRight - gestureState.dx === 0) {
      // 点击事件？
    }
    // this._previousRight -= gestureState.dx
    this._previousBottom -= gestureState.dy
    global._previousBottom = this._previousBottom
    global._previousRight = this._previousRight
  }
}
