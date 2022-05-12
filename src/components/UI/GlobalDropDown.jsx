import { useState } from "react";
import styled, { css } from "styled-components";
import { BiChevronDown } from "react-icons/bi";

function Dropdown({ selected, setSelected, options }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <Container>
      <div className="btn" onClick={(e) => setIsActive(!isActive)}>
        {selected}
        <DownIcon />
      </div>
      {isActive && (
        <div className="content">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={(e) => {
                setSelected(option);

                setIsActive(false);
              }}
              className="item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

const Container = styled.button`
  ${({ theme }) => {
    const { colors, device, calRem, fontWeight } = theme;
    return css`
      width: 100%;
      user-select: none;
      margin: 0 10px 30px 0px;
      position: relative;
      padding: 0;
      z-index: 50;

      & .btn {
        border-radius: 8px;
        padding: 15px;
        background: ${colors.white};
        border: 1px solid #e6e6e6;
        font-weight: bold;
        color: ${colors.black};
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: space-between;
      }

      & .content {
        border-radius: 8px;
        text-align: left;
        position: absolute;
        top: 110%;
        left: 0;
        padding: 10px;
        background: #fff;
        border: 1px solid #e6e6e6;
        font-weight: ${fontWeight.regular};
        color: ${colors.black};
        width: 100%;
      }

      & .content .item {
        padding: 12px 10px;
        cursor: pointer;
        transition: all 0.2s;
      }

      & .content .item:hover {
        background: #f4f4f4;
        border-radius: 8px;
      }
    `;
  }}
`;

const DownIcon = styled(BiChevronDown)`
  margin-right: 5px;
  vertical-align: middle;
  text-align: right;
  position: relative;
  bottom: 1px;
  & > polygon {
    fill: ${({ theme }) => theme.colors.white};
  }
`;
export default Dropdown;
