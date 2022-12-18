import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import * as fp from "fingerpose";

import victory_png from "../images/victory.png";
import thumbs_up_png from "../images/thumbs_up.png";

import { drawHandMesh } from "./canvasDrawingHelper";

const loadHandposeModel = async () => {
  const loadedHandposeModel = await handpose.load();
  return loadedHandposeModel;
};

const startHandposeModelDetection = async (
  webcamElementReference,
  canvasElementReference,
  loadedHandposeModel
) => {
  // Check to see if there is a webcam feed
  if (
    webcamElementReference.current !== undefined &&
    webcamElementReference.current !== null &&
    webcamElementReference.current.video.readyState === 4
  ) {
    const currentVideoFeed = webcamElementReference.current.video;
    const currentVideoFeedsVideoWidth = currentVideoFeed.videoWidth;
    const currentVideoFeedsVideoHeight = currentVideoFeed.videoHeight;

    // Set webcam feed width and height values with the extracted
    // video's width, height values
    webcamElementReference.current.video.width = currentVideoFeedsVideoWidth;
    webcamElementReference.current.video.height = currentVideoFeedsVideoHeight;

    // Same setting for canvas dimensions as well, to match those set for
    // webcam video
    canvasElementReference.width = currentVideoFeedsVideoWidth;
    canvasElementReference.height = currentVideoFeedsVideoHeight;

    // Detect hand in the video feed
    const detectedHandEstimateData = await loadedHandposeModel.estimateHands(
      currentVideoFeed
    );
    console.log(detectedHandEstimateData);

    // Feed hand landmark data as input to the
    // fingerpose model.
    if (detectedHandEstimateData.length !== 0) {
      const GE = new fp.GestureEstimator([
        fp.Gestures.VictoryGesture,
        fp.Gestures.ThumbsUpGesture,
      ]);

      const detectedGesture = await GE.estimate(
        detectedHandEstimateData[0].landmarks,
        8
      ); // 8 is the confidence level (scale of 10), could be set to 8.5
      console.log(detectedGesture);

      // Determine the gesture detected with highest confidence
      if (
        detectedGesture.gestures !== undefined &&
        detectedGesture.gestures.length !== 0
      ) {
        const detectedGestureData = detectedGesture.gestures;
        const detectedGestureConfidences = detectedGestureData.map(
          (gestureDataEntry) => gestureDataEntry.confidence
        );

        // Extract name of gesture detected with max confidence
        const detectedMaxConfidence = Math.max(...detectedGestureConfidences);
        const indexOfGestureWithMaxConfidence =
          detectedGestureConfidences.indexOf(detectedMaxConfidence);
        const nameOfGestureWithMaxConfidence =
          detectedGestureData[indexOfGestureWithMaxConfidence].name;
        console.log(
          `Detected gesture: ${nameOfGestureWithMaxConfidence} with max confidence: ${detectedMaxConfidence}`
        );
      }
    }

    // Draw hand mesh in the video feed based on
    // detected hand data.
    const currentContextOfCanvas =
      canvasElementReference.current.getContext("2d");
    currentContextOfCanvas.clearRect(
      0,
      0,
      canvasElementReference.width,
      canvasElementReference.height
    );
    drawHandMesh(detectedHandEstimateData, currentContextOfCanvas);
  }
};

// Main function that would be run in GestureDetector
// component to run the handpose model and render
// estimated hand pose.
export const commenceGestureDetection = async (
  webcamElementReference,
  canvasElementReference
) => {
  const loadedHandposeModel = await loadHandposeModel();

  // Run the hand detection every 100 milli seconds, to
  // continually process the webcam video feed and highlight
  // the detected hand through drawing on canvas element.
  const handDetectionIntervalId = setInterval(
    async () =>
      await startHandposeModelDetection(
        webcamElementReference,
        canvasElementReference,
        loadedHandposeModel
      ),
    100
  );

  return handDetectionIntervalId;
};
