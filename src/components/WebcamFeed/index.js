import { useRef } from "react";
import Webcam from "react-webcam";

const WebcamFeed = (props) => {
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  return (
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
  );
};

export default WebcamFeed;
