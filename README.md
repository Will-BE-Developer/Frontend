# [Will BE](https://willbedeveloper.com/)
<b>개발자로 취업하고싶은 사람들을 위한 화상면접 연습 커뮤니티</b>

<br />

## 프로젝트 소개

### 프로젝트 기간
* 2022.04.29 ~ 2022.06.03

<br/>

### 😎 Members

<table>
   <tr>
    <td align="center"><b><a href="https://github.com/llama-ste">안동현</a></b></td>
    <td align="center"><b><a href="https://github.com/AlgoRoots">박성혜</a></b></td>
    <td align="center"><b><a href="https://github.com/limjae">임재현</a></b></td>
    <td align="center"><b><a href="https://github.com/catalinakim">김경현</a></b></td>
    <td align="center"><b><a href="https://github.com/Juri-Lee">이주리</a></b></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/llama-ste"><img src="https://user-images.githubusercontent.com/90495580/169259372-a923afea-a898-4bca-9504-7d073d6ffab8.jpeg" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/AlgoRoots"><img src="https://user-images.githubusercontent.com/90495580/169259379-a913dd30-fa7f-4309-af30-9bd94c9608a6.png" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/limjae"><img src="https://user-images.githubusercontent.com/90495580/169259387-0e3b59ad-5882-458a-9a2b-2ccac2d696ae.png" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/catalinakim"><img src="https://user-images.githubusercontent.com/90495580/169259399-e163bd4d-9819-4ec5-9f30-ef21d0b8e9a1.png" width="100px" /></a></td>
    <td align="center"><a href="https://github.com/Juri-Lee"><img src="https://user-images.githubusercontent.com/90495580/169259405-ba67e49d-8b01-405f-b0c8-12c6054b7577.png" width="100px" /></a></td>
  </tr>
  <tr>
    <td align="center"><b>Frontend</b></td>
    <td align="center"><b>Frontend</b></td>
    <td align="center"><b>Backend</b></td>
    <td align="center"><b>Backend</b></td>
    <td align="center"><b>Backend</b></td>
  </tr>
</table>

<br/>

## 🔥 Trouble Shooting
### Issue
동영상을 인코딩할때 MediaRecorder에서 지원하는 코덱중 대부분 플랫폼에서 사용가능한 vp8 코덱과 해당 코덱으로 만들 수 있는 webm컨테이너를 사용하여 동영상을 인코딩하였더니, IOS에서는 재생되지 않는 문제가 발생하였다.

#### 원인
IOS15부터 webm audio는 지원하지만 아직 영상은 지원하지 않는다는 사실을 알게되었다.

#### 해결 순서
1. mp4컨테이너를 사용하려고 mediarecorder를 다시 찾아본 결과 h264코덱은 지원하지만 mp4 mimeType을 지원하지 않았다.
2. ffmpeg.wasm를 이용하여 브라우저에서 mp4로 컨버팅이 가능하였지만 작업 도중에 브라우저를 종료하게 된다면 컨버팅 과정이 모두 날아가고 유저의 대기시간을 생각하여서 다른 방안을 찾았다.
3. 브라우저에서 webm으로 인코딩 후 S3에 저장한 뒤 서버에서 mp4로 컨버팅 하기로 결정하였고, 서버에서 FFmpeg로 컨버팅하여 저장하였다.

