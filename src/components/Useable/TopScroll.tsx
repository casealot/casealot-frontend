// import { useState, useEffect } from "react";
// import styled from "styled-components";

// const StyledButton = styled.div<{ isVisible: boolean }>`
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: #333;
//   color: #fff;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
//   transition: opacity 0.3s ease;
//   cursor: pointer;
// `;

// const TopButton = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   const toggleVisibility = () => {
//     const scrolled = document.documentElement.scrollTop;
//     if (scrolled > 300) {
//       setIsVisible(true);
//     } else {
//       setIsVisible(false);
//     }
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", toggleVisibility);
//     return () => {
//       window.removeEventListener("scroll", toggleVisibility);
//     };
//   }, []);

//   return (
//     <StyledButton isVisible={isVisible} onClick={scrollToTop}></StyledButton>
//   );
// };

// export default TopButton;
