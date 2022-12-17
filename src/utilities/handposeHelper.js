import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";

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
