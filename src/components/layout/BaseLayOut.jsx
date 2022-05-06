import Header from "./Header";
import GlobalStyles from "../../styled/GlobalStyles";
import BodyLayOut from "./BodyLayOut";

const BaseLayOut = ({ children }) => {
  return (
    <div>
      <Header />
      <GlobalStyles />
      <BodyLayOut>{children}</BodyLayOut>
    </div>
  );
};

export default BaseLayOut;
