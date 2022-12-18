import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { ThreeCircles } from "react-loader-spinner";

import victory_png from "../../images/victory.png";
import thumbs_up_png from "../../images/thumbs_up.png";

import { commenceGestureDetection } from "../../utilities/handposeHelper";

const WebcamFeed = (props) => {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  // Sets the initial loading state to true to render loader spinner
  const [isWebcamFeedLoading, setWebcamFeedLoadState] = useState(true);
  const [detectedGestureName, setDetectedGestureName] = useState({});

  const gestureNameImageMapping = {
    victory: victory_png,
    thumbs_up: thumbs_up_png,
  };

  // Executed just once to set load state to false, which replaces
  // the rendered loader spinner with webcam feed. Also, kicks off
  // the handpose detection app flow and tracks the detection interval id,
  // to be cleared when detection is stopped and this component unmounts.
  useEffect(() => {
    let handposeDetectionIntervalId;

    const commenceDetectionAndGetIntervalId = async () => {
      handposeDetectionIntervalId = await commenceGestureDetection(
        webCamRef,
        canvasRef,
        setDetectedGestureName // To set name of newly detected gesture,
        // from within startHandposeModelDetection()
        // method, invoked by commenceGestureDetection().
      );
    };

    commenceDetectionAndGetIntervalId();

    setWebcamFeedLoadState(false);

    // Returned method called only before this component
    // unmounts, as part of cleanup.
    return () => clearInterval(handposeDetectionIntervalId);
  }, [detectedGestureName]); // Will be invoked each time value in detectedGestureName is updated
  // with a call to setDetectedGestureName() method inside
  // the helper method startHandposeModelDetection() from handposeHenper.js
  // file.

  const renderedUI = isWebcamFeedLoading ? (
    <ThreeCircles
      height="100"
      width="100"
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor="#f4c330"
      innerCircleColor="#5cdb57"
      middleCircleColor="#e7ed3b"
    />
  ) : (
    <div>
      <Webcam
        ref={webCamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          // left: 0,
          // right: 0,
          top: 90,
          bottom: 50,
          right: 50,
          left: 50,
          textAlign: "center",
          zindex: 9,
          width: 640, //"60vw",
          height: 480, //"70vh",
          // border: "o.1rem solid yellow",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          // left: 0,
          // right: 0,
          top: 90,
          bottom: 50,
          right: 50,
          left: 50,
          textAlign: "center",
          zindex: 9,
          width: 640, //"60vw",
          height: 480, //"70vh",
          // border: "o.1rem solid green",
        }}
      />
    </div>
  );

  return renderedUI;
};

export default WebcamFeed;
