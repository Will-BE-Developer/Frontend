import GlobalModal from "../GlobalModal";

import styled from "styled-components";
const TermsModal = (props) => {
  const { openTermsModal, setOpenTermsModal } = props;

  if (openTermsModal) {
    document.body.style.cssText = `overflow:hidden;`;
  } else {
    document.body.style.cssText = `overflow:auto;`;
  }
  return (
    <GlobalModal
      title="윌비 서비스 이용 약관"
      confirmText="내 프로필로 가기"
      open={openTermsModal}
      onClose={() => setOpenTermsModal(false)}
      _width="400"
      _height="800px"
      _mobileHeight="600px"
      btnHeight="50px"
      hover
    >
      <Container>
        <h4>
          [윌비]('willbedeveloper.com'이하 'Will Be')*은(는) 「개인정보 보호법」
          제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을
          신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보
          처리방침을 수립·공개합니다. <br /> ○ 이
          개인정보처리방침은 *2022*년 *5*월 *20*부터 적용됩니다.
        </h4>
        <table className="table">
          <thead>제1조(개인정보의 처리 목적)</thead>
          <p>
            [윌비]('willbedeveloper.com'이하 'Will Be')는 다음의 목적을 위하여
            개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의
            용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보
            보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할
            예정입니다.
          </p>
          <br />
          <tbody>
            <tr className="table_tr">
              <h4>1. 홈페이지 회원가입 및 관리</h4>
              회원 가입의사 확인, 회원자격 유지·관리 목적으로 개인정보를
              처리합니다. <br />
              <br />
              <h4>2. 마케팅 및 광고에의 활용</h4>
              이벤트 및 광고성 정보 제공 및 참여기회 제공 등을 목적으로
              개인정보를 처리합니다.
            </tr>
          </tbody>
          <br />
          <br />
          <thead>제2조(개인정보의 처리 및 보유 기간)</thead>
          <p>
            1️⃣  [윌비]는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
            개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서
            개인정보를 처리·보유합니다.
            <br />
            2️⃣ 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
          </p>
          <tbody>
            <tr className="table_tr">
              1.[홈페이지 회원가입 및 관리]
              <div>
                [홈페이지 회원가입 및 관리]와 관련한 개인정보는 수집.이용에 관한
                동의일로부터[3개월]까지 위 이용목적을 위하여 보유.이용됩니다.{" "}
                <br />- 보유근거 : 「개인정보보호법」 제15조(개인정보의
                수집·이용) 제1항 <br />
                - 관련법령 : <br />- 예외사유 :
              </div>
            </tr>
          </tbody>

          <br />
          <br />
          <thead>제3조(처리하는 개인정보의 항목)</thead>
          <p>
            1️⃣ [ 윌비 ]는 다음의 개인정보 항목을 처리하고 있습니다.
            <br />
          </p>
          <tbody>
            <tr className="table_tr">
              <div>
                1. [ 홈페이지 회원가입 및 관리 ] <br /> - 필수항목 : 이메일,
                비밀번호 <br />- 선택항목 :{" "}
              </div>
            </tr>
          </tbody>

          <br />
          <br />
          <thead>제4조(개인정보의 파기절차 및 파기방법)</thead>
          <tbody>
            <tr className="table_tr">
              1️⃣ [ 윌비 ] 는 개인정보 보유기간의 경과, 처리목적 달성 등
              개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
              파기합니다.
            </tr>
            <tr className="table_tr">
              2️⃣ 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나
              처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를
              계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의
              데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다. <br />
              <div>
                1. 법령 근거 :<br />
                2. 보존하는 개인정보 항목 : 이메일, 면접영상
              </div>
            </tr>
            <tr className="table_tr">
              3️⃣ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
              <br />
              <div>
                1. 파기절차
                <br />[ 윌비 ] 는 파기 사유가 발생한 개인정보를 선정하고, [ 윌비
                ] 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.{" "}
                <br />
                2. 파기방법
                <br />
                전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을
                사용합니다. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을
                통하여 파기합니다
              </div>
            </tr>
          </tbody>
        </table>
      </Container>
    </GlobalModal>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  overflow-y: scroll;
  font-size: 14px;
  h4 {
    line-height: 1.2em;
  }
  & .table {
    width: 100%;
    margin-top: 30px;
    border-collapse: separate;
    border-spacing: 0 8px;
    font-size: ${({ theme }) => theme.calRem(14)};

    thead {
      font-size: 20px;
    }

    p {
      font-weight: 700;
      line-height: 1.5em;
      /* font-style: italic; */
    }
    tbody {
      line-height: 1.5em;
      h4 {
        font-weight: 600;
      }
      div {
        padding: 0 10px;
      }

      .table_tr {
      }
    }
  }
`;

export default TermsModal;
