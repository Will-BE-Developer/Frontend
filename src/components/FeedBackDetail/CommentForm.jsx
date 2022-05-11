import { useState } from "react";
import styled from "styled-components";

const CommentForm = ({
  handleSubmit,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <Form onSubmit={onSubmit}>
      <div></div>
      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="댓글을 남겨주세요."
      />
      {hasCancelButton && (
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </Form>
  );
};

const Form = styled.form`
  & .textarea {
    width: 100%;
    height: 40px;
    margin: 16px 0px;
    border: 1px solid rgb(0, 5, 0.2);
  }

  & .button {
    font-size: 16px;
    padding: 8px 16px;
    background: rgb(59, 130, 246);
    border-radius: 8px;
    color: white;

    :hover:enabled {
      cursor: pointer;
      background: rgb(37, 99, 235);
    }

    :disabled {
      opacity: 0.7;
      cursor: default;
    }
  }

  & .cancel-button {
    margin-left: 10px;
  }
`;

export default CommentForm;
