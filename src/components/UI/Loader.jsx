import styled from "styled-components";
import logo from "../../assets/loaderLogo.png";

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
  height: 50vh;
  width: 100%;
  img {
    width: 207px;
    height: 90px;
  }

  animation: fadein 1.5s;
  -webkit-animation: fadein 1.5s;

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default Loader;
