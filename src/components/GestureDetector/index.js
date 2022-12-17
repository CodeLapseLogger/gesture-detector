import { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";

import WebcamFeed from "../WebcamFeed";

import {
  GestureDetectorBgContainer,
  ToggleGestureDetectionButton,
} from "./styledComponents";

const GestureDetector = (props) => {
  const [isDetectingGesture, setGestureDetectionState] = useState(false);

  const toggleGestureDetectionMode = () =>
    setGestureDetectionState(!isDetectingGesture);

  return (
    <GestureDetectorBgContainer>
      {isDetectingGesture && <WebcamFeed />}

      <ToggleGestureDetectionButton
        type="button"
        onClick={toggleGestureDetectionMode}
      >
        {isDetectingGesture
          ? "Stop Gesture Detection"
          : "Start Gesture Detection"}
      </ToggleGestureDetectionButton>
    </GestureDetectorBgContainer>
  );
};

export default GestureDetector;
