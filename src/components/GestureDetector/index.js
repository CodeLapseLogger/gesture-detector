import { Component, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";

export default class GestureDetector extends Component {
  state = {
    isDetectingGesture: false,
  };

  render() {
    return <h1> Gesture Detector </h1>;
  }
}
