import { useState } from "react";

import WebcamFeed from "../WebcamFeed";
import GestureDetectionStartMessage from "../GestureDetectionStartMessage";

import {
  GestureDetectorBgContainer,
  ToggleGestureDetectionButton,
} from "./styledComponents";

const GestureDetector = (props) => {
  const [isDetectingGesture, setGestureDetectionState] = useState(false);

  const toggleGestureDetectionMode = () =>
    setGestureDetectionState(!isDetectingGesture);

  return (
    <GestureDetectorBgContainer isDetectingGesture={isDetectingGesture}>
      {isDetectingGesture ? <WebcamFeed /> : <GestureDetectionStartMessage />}

      <ToggleGestureDetectionButton
        type="button"
        onClick={toggleGestureDetectionMode}
        isDetectingGesture={isDetectingGesture}
      >
        {isDetectingGesture
          ? "Stop Gesture Detection"
          : "Start Gesture Detection"}
      </ToggleGestureDetectionButton>
    </GestureDetectorBgContainer>
  );
};

export default GestureDetector;
