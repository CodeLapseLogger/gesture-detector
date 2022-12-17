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
          width: "60vw",
          height: "70vh",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          width: "60vw",
          height: "70vh",
        }}
      />
    </>
  );
};

export default WebcamFeed;
