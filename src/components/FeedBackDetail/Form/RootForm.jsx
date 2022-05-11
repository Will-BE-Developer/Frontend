import { useState } from "react";
import styled from "styled-components";
import GlobalTextArea from "../UI/GlobalTextArea";
import GlobalButton from "../UI/GlobalButton";
import commentApis from "../../apis/commentApis";

const RootForm = (props) => {
  const { handleSubmit, initialText = "", rootId, setAllComments } = props;
  const [text, setText] = useState(initialText);
  console.log(text);
  const isTextareaDisabled = text.length === 0;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(event.target.value);

    const rootData = {
      contents: text,
      rootId: 1,
    };

    // try {
    //   const addDataResponse = await commentApis.addComment(rootData).unwrap();
    //   console.log(addDataResponse);
    //   setText("");
    //   try {
    //     const getDataResponse = await commentApis.getComments(1);
    //     console.log(getDataResponse);
    //     setAllComments(getDataResponse);
    //   } catch (err) {
    //     console.log("댓글 불러오기 오류", err.response);
    //   }
    // } catch (err) {
    //   console.log("댓글 작성 오류", err.message);
    // }
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <div className="textarea_box">
        <GlobalTextArea
          charLimit="50"
          rows="5"
          cols="80"
          placeholder="댓글을 남겨주세요."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="button_box">
        <GlobalButton
          disabled={isTextareaDisabled}
          type="submit"
          _width="70px"
          _height="15px"
          hover
          text="작성"
        />
      </div>
    </Form>
  );
};

const Form = styled.form`
  padding: 30px 0;
  textarea {
    height: 100px;
  }
  & .textarea_box {
    padding-bottom: 10px;
  }
  & .button_box {
    display: flex;
    justify-content: flex-end;
    button {
      font-size: ${({ theme }) => theme.calRem(12)};
    }
  }
`;

export default RootForm;
