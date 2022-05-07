import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import GlobalCard from "../components/UI/GlobalCard";
import GlobalModal from "../components/UI/GlobalModal";
import instance from "../apis/axios";

const FeedBack = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    instance
      .get("/api/interviews")
      .then((res) => {
        console.log(res);
        setData(res.data.interviews);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      {data.map((data) => {
        return <GlobalCard key={data.id} data={data} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  /* gap: 5px; */

  width: 100%;
  padding: 50px 0;
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
`;

export default FeedBack;
