import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import GlobalCard from "../components/UI/GlobalCard";

import instance from "../apis/axios";
import Dropdown from "../components/UI/GlobalDropDown";
import { getFeedback as getFeedbackApi } from "../apis/async.js";

const FeedBack = () => {
  const [data, setData] = useState([]);

  const [selectedDate, setSelectedDate] = useState("(정렬)");
  const [selectedCategory, setSelectedCategory] = useState("전체보기");
  useEffect(() => {
    getFeedbackApi().then((data) => {
      setData(data.interviews);
    });
  }, []);

  const dateList = ["최신순", "오래된순"];
  const categoryList = ["Frontend", "Backend"];

  return (
    <Container>
      <div className="dropDown_container">
        <Dropdown
          selected={selectedDate}
          setSelected={setSelectedDate}
          options={dateList}
        />
        <Dropdown
          selected={selectedCategory}
          setSelected={setSelectedCategory}
          options={categoryList}
        />
      </div>
      <div className="card_wrap">
        {data?.map((card) => {
          return <GlobalCard key={card.id} card={card} />;
        })}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0;

  & .dropDown_container {
    display: flex;
    justify-content: right;
    left: 0;
    width: 316px;
    margin-left: auto;
  }

  & .card_wrap {
    display: flex;
    flex-wrap: wrap;

    justify-content: space-around;
    /* gap: 5px; */

    animation: fadeInBottom 1s;
    transform: translateY(0%);
    @keyframes fadeInBottom {
      from {
        opacity: 0;
        transform: translateY(30%);
      }
      to {
        opacity: 1;
      }
    }
  }
`;

export default FeedBack;
