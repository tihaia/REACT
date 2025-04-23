import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  font-size: small;
  font-family: 'Space Grotesk', sans-serif;
`;

function Footer() {
  return <StyledFooter>© {(new Date().getFullYear())}</StyledFooter>;
}

export default Footer;
