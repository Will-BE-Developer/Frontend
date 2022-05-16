import styled from "styled-components";
import PacmanLoader from "react-spinners/PacmanLoader";
import theme from "../../styles/theme";

const UploadingLoader = () => {
  return (
    <LoaderLayout>
      <PacmanLoader speedMultiplier={2} color={theme.colors.main} />
      <div className="text">
        <p>영상을 업로드중 입니다</p>
        <p className="noti">최대 1분이 소요될 수 있습니다</p>
      </div>
    </LoaderLayout>
  );
};

const LoaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  width: 100%;

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
export default UploadingLoader;
