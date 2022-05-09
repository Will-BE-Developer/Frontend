import styled from "styled-components";
import logo from "../../assets/logo.png";

const Loader = () => {
  return (
    <LoaderLayout>
      <img src={logo} alt="logo" />
    </LoaderLayout>
  );
};

const LoaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

  img {
    width: 207px;
    height: 90px;
  }
`;

export default Loader;
