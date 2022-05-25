import PacmanLoader from "react-spinners/PacmanLoader";
import theme from "../../styles/theme";
import styled from "styled-components";

const LoadingLoader = ({ text, noti, _height }) => {
  const styles = {
    _height,
  };
  return (
    <LoaderLayout {...styles}>
      <div className="loader">
        <PacmanLoader speedMultiplier={2} color={theme.colors.main} />
      </div>
      <div className="text">
        <p>{text}</p>
        <p className="noti">{noti}</p>
      </div>
    </LoaderLayout>
  );
};

const LoaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${(props) => (props._height ? props._height : "80vh")};
  .loader {
    padding: 0 40px 20px 0px;
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    gap: 10px;
  }

  .noti {
    color: ${({ theme }) => theme.colors.grey40};
  }
`;
export default LoadingLoader;
