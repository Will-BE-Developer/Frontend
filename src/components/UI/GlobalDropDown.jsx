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
    const { colors, device, calRem } = theme;
    return css`
      width: 100%;
      user-select: none;
      margin: 0 10px 150px 0px;
      position: relative;
      padding: 0;
      & .btn {
        padding: 15px;
        background: #fff;
        border: 1px solid #e6e6e6;
        font-weight: bold;
        color: #333;
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: space-between;
      }

      & .content {
        position: absolute;
        top: 110%;
        left: 0;
        padding: 10px;
        background: #fff;
        border: 1px solid #e6e6e6;
        font-weight: 500;
        color: #333;
        width: 100%;
      }

      & .content .item {
        padding: 10px;
        cursor: pointer;
        transition: all 0.2s;
      }

      & .content .item:hover {
        background: #f4f4f4;
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
