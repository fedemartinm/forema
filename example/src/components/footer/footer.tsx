import { FooterContainer, FooterText, Icon, StyledLink } from "./styles";

import githubImage from "../../images/github.svg";

export const Footer = () => (
  <FooterContainer>
    <StyledLink
      to={{ pathname: "https://github.com/fedemartinm/forema" }}
      target="_blank"
    >
      forema
    </StyledLink>

    <FooterText>— a customizable forum application</FooterText>
    <Icon src={githubImage} />
  </FooterContainer>
);
