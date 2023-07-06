import { useState, useEffect } from "react";
import styled from "styled-components";
import NavigationIcon from "@mui/icons-material/Navigation";
const StyledButton = styled.button<{ isVisible: boolean }>`
  position: fixed;
  bottom: 50px;
  right: 50px;
  padding: 10px;
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 50%;
  opacity: ${(props) => (props.isVisible ? "1" : "0")};
  transition: opacity 0.3s;
  cursor: pointer;
  width: 50px;
  height: 50px;
`;

const TopScroll = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <StyledButton isVisible={isVisible} onClick={scrollToTop}>
      <NavigationIcon />
    </StyledButton>
  );
};

export default TopScroll;
