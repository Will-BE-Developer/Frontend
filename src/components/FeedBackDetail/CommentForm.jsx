import { useState } from "react";
import styled from "styled-components";
import GlobalTextArea from "../UI/GlobalTextArea";
import GlobalButton from "../UI/GlobalButton";

const CommentForm = ({
  handleSubmit,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmitHandler = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
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

export default CommentForm;
