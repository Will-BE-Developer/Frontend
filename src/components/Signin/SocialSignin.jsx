import styled from "styled-components";
import { KAKAO_OAUTH_URL } from "../../shared/OAuth";
import kakaoIcon from "../../assets/icons/kakao_icon.png";

const SocialSignin = () => {
  return (
    <KakaoBtn onClick={() => window.location.replace(KAKAO_OAUTH_URL)}>
      <img alt="kakao login" src={kakaoIcon} />
      <span>카카오톡으로 시작하기</span>
    </KakaoBtn>
  );
};

const KakaoBtn = styled.div`
  img {
  }
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 11px 18px;

  border-radius: 8px;
  background-color: #fee500;

  &:hover {
    cursor: pointer;
  }

  img {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }

  span {
    font-size: ${({ theme }) => theme.calRem(14)};
    color: #000000;
  }

  ${({ theme }) => theme.device.mobile} {
    height: 40px;
    img {
      margin-right: 10px;
      width: 15px;
      height: 15px;
    }
    span {
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
      margin-right: 0;
      font-size: ${({ theme }) => theme.calRem(12)};
      padding: "0px 16px";
    }
  }
`;

export default SocialSignin;
