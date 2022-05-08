import { css } from "styled-components";

export const boxShadow = () => {
  return css`
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.04),
      0px 8px 32px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
  `;
};
