import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../apis/axios";

const FeedBackDetail = (props) => {
  const { postId } = useParams();

  const [data, setData] = useState([]);

  useEffect(() => {
    instance
      .get(`/api/interviews/${postId}`)
      .then((res) => {
        instance.get(res.data.video, { responseType: "blob" }).then((res) => {
          setData(URL.createObjectURL(res.data));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data);

  return (
    <div>
      <video width="320" height="240" controls src={data}></video>
    </div>
  );
};

export default FeedBackDetail;
