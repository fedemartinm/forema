import { Footer } from "../footer/footer";
import { LayoutContainer, LayoutContent } from "./styles";

export const Layout = (props: any) => {
  return (
    <LayoutContainer>
      <LayoutContent>{props.children}</LayoutContent>
      <Footer />
    </LayoutContainer>
  );
};
