import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const FooterText = styled.div`
  text-align: center;
  color: #cacaca;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  display: inline-block;
  margin-left: 12px;
`;

export const StyledLink = styled(Link)`
  &,
  &:visited,
  &:hover,
  &:active {
    color: #1976d2;
  }

  margin-right: 6 px;
`;
