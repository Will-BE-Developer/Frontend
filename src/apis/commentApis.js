import instance from "./axios.js";
import { getCookie } from "../shared/cookies";

const commentApis = {
  getComments: async (cardId) => {
    try {
      const response = await instance.get(`/api/comments/${cardId}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return response.data;
    } catch (err) {
      return err.response;
    }
  },

  addComment: async (data) => {
    console.log(data);
    try {
      const response = await instance.post(`/api/comments`, data, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return err.response.data;
    }
  },

  testGetComments: async () => {
    const testData = {
      data: {
        comments: [
          {
            id: 1,
            parrentId: null,
            user: {
              id: 1,
              nickname: "성혜",
              githubLink: "",
              profileImageUrl:
                "https://firebasestorage.googleapis.com/v0/b/react-deep-99.appspot.com/o/images%2F1_1650953241454?alt=media&token=7e31bc8a-352c-48bf-90e6-1fce202e8935",
              introduce: "",
            },
            contents:
              "이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게 하는건 어떰? 이렇게 하는건 어떨까요? 아니면 저렇게...",
            nestedCommentsCount: 3,
            nestedComments: [
              {
                parentId: 1,
                id: 1,
                user: {
                  id: 4,
                  nickname: "대댓글유저1",
                  githubLink: null,
                  profileImageUrl: null,
                  introduce: "대댓글 1: 안녕하세요 반갑습니다",
                },
                isMine: true,
                createdAt: "2022-05-05 10:09",
                updatedAt: "2022-05-05 10:09",
              },
              {
                parentId: 1,
                id: 2,
                user: {
                  id: 5,
                  nickname: "대댓글유저2",
                  githubLink: null,
                  profileImageUrl: null,
                  introduce: "대댓글2: 반갑습니다~~~~~~!!!!! ",
                },
                isMine: false,
                createdAt: "2022-05-06 10:09",
                updatedAt: "2022-05-06 10:09",
              },
              {
                parentId: 1,
                id: 1,
                user: {
                  id: 4,
                  nickname: "대댓글유저1",
                  githubLink: null,
                  profileImageUrl: null,
                  introduce: "대댓글 3: 대댓글유저1이 대댓글 달았을 때",
                },
                isMine: true,
                createdAt: "2022-05-07 10:09",
                updatedAt: "2022-05-07 10:09",
              },
            ],
            isMine: true,
            createdAt: "2022-05-04 10:09",
            updatedAt: "2022-05-04 10:09",
          },

          {
            id: 2,
            parrentId: null,
            user: {
              id: 3,
              nickname: "병아리",
              githubLink: "",
              profileImageUrl:
                "https://firebasestorage.googleapis.com/v0/b/react-deep-99.appspot.com/o/images%2F1_1650953241454?alt=media&token=7e31bc8a-352c-48bf-90e6-1fce202e8935",
              introduce: "",
            },
            contents: "두 번째 댓글",
            nestedCommentsCount: 3,
            nestedComments: [
              {
                parentId: 2,
                id: "1",
                user: {
                  id: "6",
                  nickname: "대댓글유저6",
                  githubLink: null,
                  profileImageUrl: null,
                  introduce: "대댓글 1: 안녕하세요 반갑습니다",
                },
                isMine: true,
                createdAt: "2022-05-05 10:09",
                updatedAt: "2022-05-05 10:09",
              },
              {
                parentId: 2,
                id: "2",
                user: {
                  id: "7",
                  nickname: "대댓글유저7",
                  githubLink: null,
                  profileImageUrl: null,
                  introduce: "대댓글2: 반갑습니다~~~~~~!!!!! ",
                },
                isMine: false,
                createdAt: "2022-05-06 10:09",
                updatedAt: "2022-05-06 10:09",
              },
            ],
            isMine: true,
            createdAt: "2022-05-04 10:09",
            updatedAt: "2022-05-04 10:09",
          },
        ],
        pagination: {
          per: 5,
          totalCounts: 61,
          totalPages: 13,
          currentPage: 3,
          nextPage: 4,
          isLastPage: false,
        },
      },
    };

    return testData.data;
  },
};
export default commentApis;
