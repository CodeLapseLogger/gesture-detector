import styled from "styled-components";

export const WebcamFeedBgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const DetectedGesture = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GestureImage = styled.img`
  height: 5rem;
  width: 5rem;
  margin-bottom: 1.5rem;
`;

export const DetectionConfidenceScoreLabel = styled.p`
  color: ${(props) => (props.isDarkTheme ? "#ffffff" : "#000000")};
  font-size: 1.5rem;
  font-family: "Roboto";
  font-weight: 600;
`;

export const DetectionConfidenceScore = styled(DetectionConfidenceScoreLabel)`
  color: green;
`;
