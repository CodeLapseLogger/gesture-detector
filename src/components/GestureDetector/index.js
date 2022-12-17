import { useState, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";

import {
  GestureDetectorBgContainer,
  ToggleGestureDetectionButton,
} from "./styledComponents";

const GestureDetector = (props) => {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  const [isDetectingGesture, setGestureDetectionState] = useState(false);

  const toggleGestureDetectionMode = () =>
    setGestureDetectionState(!isDetectingGesture);

  return (
    <GestureDetectorBgContainer>
      {isDetectingGesture && (
        <>
          <Webcam
            ref={webCamRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 1,
              width: "60vw",
              height: "70vh",
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 1,
              width: "60vw",
              height: "70vh",
            }}
          />
        </>
      )}

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
