import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { ThreeCircles } from "react-loader-spinner";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const WebcamFeed = (props) => {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);

  // Sets the initial loading state to true to render loader spinner
  const [isWebcamFeedLoading, setWebcamFeedLoadState] = useState(true);

  // Executed just once to set load state to false, which replaces
  // the rendered loader spinner with webcam feed
  useEffect(() => {
    setWebcamFeedLoadState(false);
  }, []);

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
    <>
      <Webcam
        ref={webCamRef}
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          top: 90,
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
          top: 90,
          textAlign: "center",
          zindex: 1,
          width: "60vw",
          height: "70vh",
        }}
      />
    </>
  );

  return renderedUI;
};

export default WebcamFeed;
