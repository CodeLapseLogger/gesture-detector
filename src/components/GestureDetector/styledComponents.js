import styled from "styled-components";

export const GestureDetectorBgContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100%;
  //   width: 100vw;
  padding: 2rem;
  background-color: ${(props) => (props.isDarkTheme ? "#191a1c" : "#ffffff")};
`;

// ${(props) => props.isDetectingGesture ? "flex-end" : "center"};

export const ToggleGestureDetectionButton = styled.button`
  background-color: ${(props) => (props.isDarkTheme ? "#76b0cc" : "#1a80f4")};
  color: #ffffff;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  font-size: 1.5rem;
  font-family: "Roboto";
  font-weight: 550;
`;
