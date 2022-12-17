import styled from "styled-components";

export const GestureDetectionStartMessageContainer = styled.h1`
  font-family: "Roboto";
  font-size: 2.5rem;
  font-weight: 600;
  color: ${(props) => (props.isDarkTheme ? "#ffffff" : "##191a1c")};
  text-align: center;
`;
