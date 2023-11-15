<img width="100%" alt="chatting" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/6acbc2ff-2441-4308-8e40-9d2648e80929.gif">

<div align="center">
  
## GUZZI ROOM
물가 상승으로 인해 소비를 절약하려 했지만 혼자서는 어려움을 겪으셨나요?<br>
"GUZZI ROOM(거지방)"은 소비 절약을 추구하는 개개인들을 위해 채팅 환경을 제공하는 서비스입니다.<br><br>

</div>

<div align="center">
  
## 목차

</div>

1. [프로젝트에 대하여](#1-프로젝트에-대하여)
2. [기술 스택](#2-기술-스택)
3. [설계 및 아키텍처](#3-설계-및-아키텍처)
4. [UI/UX에 관한 고민](#4-UIUX에-관한-고민)
5. [최적화를 위한 고민](#5-최적화를-위한-고민)
6. [Reference](#6-Reference)

<br>

## `1. 프로젝트에 대하여`
### 프로젝트 설명
<blockquote>
요즘은 물가 상승과 금리 인상으로 인해 절약이 중요한 주제로 떠오르고 있습니다. <br>
그러나 현대 사회에서는 편리한 배달음식과 인터넷 쇼핑 등이 절약을 어렵게 합니다. <br>
이에 소비에만 의존하지 않고, 스스로를 명품으로 느낄 수 있는 방법을 찾고자 합니다.<br>
이를 위해 함께 노력하고 독려하는 채팅방을 만들어보았습니다.
</blockquote>

### 프로젝트 링크
<blockquote>
  
최종 배포 링크 : [GUZZI-ROOM](https://all-chat.netlify.app/guzzi) <br>
백엔드 Repo 링크 : https://github.com/mingle-mongle/guzzi

</blockquote>
<br>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>
<br>

## `2. 기술 스택`
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"><br>
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"><br>
<img src="https://img.shields.io/badge/CodeSandbox-181717?style=for-the-badge&logo=codesandbox&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><br>
<img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">
<br>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>
<br>

## `3. 설계 및 아키텍처`

<b>FLOW</b><br>
채팅방 입장에서 텍스트, 이미지 전송까지
<div>
<img width="50%" alt="haoaoao" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/9aa45737-fd69-4818-b032-f9d04845a522">
</div>

<br>

### ⚙️ 3-Tier Architecture

<img width="70%" alt="haoaoao" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/f449399b-c070-4819-b9e6-bc8dcc4ef1cc">
</br> Client : REACT </br> Server : Aws App Runner(Express) </br> Database : PlanetScale(MySQL) </br>

<br>


### ⚙️ GET

#### 🔹 채팅 리스트 페이지별 요청

<img width="100%" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/f467001d-9d8f-4553-9186-8dc2c06e333a.png">

 - 페이지가 정상적으로 요청되었을 시 채팅 리스트를 불러옵니다.
 - 올바른 요청이 아닐 시 MUI Snackbar로 Alert를 띄웁니다.

#### 🔹 IP 주소 요청

<img width="100%" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/5e93786b-0c63-4a59-ac0f-51bd93febd6a.png">

 - 해당 채팅방의 접근성을 높이기 위해 회원가입 후 로그인 입장이 아닌, IP 기반으로 사용자를 구분할 수 있도록 만들었습니다.
<br>

### ⚙️ POST

#### 🔹텍스트 메세지 POST

<img width="100%" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/745479ac-3192-4eef-9861-827cd0b655ba.png">

 - TextField에 값이 없을 시 SEND 버튼을 비활성화 합니다. 이는 NULL 값이 POST 되지 않기 위함입니다.
 - TextField에 텍스트 입력 시 image 버튼은 비활성화 되며, 이를 시각적으로 나타내기 위해 45도 돌아가도록 만들었습니다.

#### 🔹이미지 메세지 POST

<img width="100%" alt="archtectuer" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/4caab2c5-2539-46b0-b616-6ba37849221c.png">

- Input에 이미지 값이 없을 시 SEND 버튼을 비활성화 합니다. 이는 NULL 값이 POST 되지 않기 위함입니다.
- Input에 이미지 값 입력 시 TextField는 disabled로 비활성화 하였습니다.

<br>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>
<br>
  
## 4. `UI/UX에 관한 고민`

### 💡 반응형 웹을 위한 Grid

<img width="100%" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/2e8ff736-dcb9-4aee-909e-6932af0722c5"/>
<img width="100%" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/44d7a625-565b-426c-8700-3f58eb9203f5"/>

- [MUI](https://mui.com/)를 활용하여 Grid를 구현했습니다.
  - Grid 컴포넌트의 spacing과 breakpoints 속성 sx, md, lg를 사용했습니다.
  - sx: sx 속성은 Grid 컴포넌트의 스타일을 직접 설정할 때 사용됩니다. 이 속성을 사용하여 커스텀 스타일을 적용할 수 있습니다.
  - md와 lg: md와 lg는 미디어 쿼리 브레이크포인트를 나타내며, Grid 컴포넌트 내에서 아이템의 가로 너비를 지정할 때 사용됩니다.
    - xs: Extra Small 화면 크기
    - sm: Small 화면 크기
    - md: Medium 화면 크기
    - lg: Large 화면 크기
```
<Grid xs={12} md={12} lg={3}>
</Grid>
<Grid xs={12} md={12} lg={6}>
</Grid>
<Grid xs={12} md={12} lg={3}>
</Grid>
```


<br>

### 💡 SEND 버튼 활성화, 비활성화

<img width="100%" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/08a7989c-e6b8-4b16-9bed-915cd4c61e13.png"/>
 
- DB content 칼럼에 Text 메세지인지 Image 메세지인지 구분하여 저장하도록 하였습니다. 빈 값이 들어가는 경우 에러가 발생하여 어떠한 값도 입력되지 않았을 경우 SEND 버튼을 비활성화 해두었습니다.
- 또한 Text 메세지인지 Image 메세지 두 개의 항목이 동시에 저장되는 상황이 발생하였습니다.
  - 따라서 Text 메세지 POST 시 이미지 전송 버튼이 45도 돌아가며, 비활성화 되도록 하였습니다.
  - Image 메세지 POST 시 전송할 이미지를 선택하면 미리보기가 가능하고, 텍스트 입력 창이 비활성화 되도록 하였습니다.

<br>

### 💡 메세지 좌, 우 정렬

<img width="100%" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/79d958b1-976a-48ea-b62e-89e83cd1ffc2.png"/>

- 나의 메세지를 오른쪽 정렬, 타인의 메세지를 왼쪽 정렬하여 구분할 수 있도록 하였습니다.
- localStorage에 저장되어있는 IP를 기반으로 삼항연산자 조건문을 통해 구분할 수 있도록 하였습니다.

```
              {data &&
                data.map((item) => {
                  const isMyMessage = item.user.ip === ipAddress; // 내 IP인지 여부
                  const alignment = isMyMessage ? "flex-end" : "flex-start";

                  return (
                    <Box display="flex" flexDirection="column" p={1}>
                      <Box>
                        {isMyMessage === false ? (
                          <img
                            src="coin.png"
                            alt="프로필"
                            width="40"
                            height="40"
                            style={{ marginRight: "10px" }}
                          />
                        ) : null}
                        <Typography>
                          {item.content}
                          {item.image.includes("data:image") ? (
                            <img
                              src={item.image}
                              width="150"
                              height="150"
                              alt="map안에서 채팅"
                            />
                          ) : null}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
```

<br>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>
<br>

## 5. `최적화를 위한 고민`

### 💡 Fetch와 Clean Up

```
  React.useEffect(() => {
    const timeout = setInterval(async () => {
      const res = await fetch(`${SERVER}/lists?page=1`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache"
        }
      });
      if (res.ok) {
        const json = await res.json();
        setData(json.reverse());
        console.log(json);
      }
    }, 3000);
    return () => clearInterval(timeout);
  }, []);
```

- 비동기로 움직이는 uesEffect에 delay를 넣어 cleanup을 하였습니다.
- rateLimit에 대한 고민으로 부터 시작했습니다.

<br>

### 💡 Image POST 처리

```
  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const options = {
      maxSizeMB: file.size,
      fileType: file.type,
      initialQuality: 0.5,
      alwaysKeepResolution: true
    };

    const compressedImage = await imageCompression(file, options);
    const data = new FileReader();
    data.readAsDataURL(compressedImage);
    data.addEventListener("load", () => {
      const compressedSize = compressedImage.size;
      if (compressedSize < 50 * 1024) {
        setImgBase64(data.result);
      } else {
        setOpen(true);
        setSnackbar({
          severity: "error",
          message: "용량이 너무 큽니다. 50kb로 줄여주세요."
        });
      }
    });
  };
```
- image는 base64 문자열로 저장하였습니다.
- 이미지 크기가 큰 경우 에러가 발생하여 50 * 1024 이하로 이미지 크기를 축소한 뒤 저장할 수 있도록 만들었습니다.
- 이미지 크기를 축소한 뒤에도 50 * 1024 보다 크기가 큰 경우 에러메세지를 띄웁니다.

<br>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>
<br>

## 6. `Reference`

- https://ko.legacy.reactjs.org/
- https://www.youtube.com/watch?v=ccwPs2hmo7w&t=466s
- https://www.youtube.com/watch?v=VxqZrL4FLz8&t=50s
- https://www.inflearn.com/course/lecture?courseSlug=%EA%B0%9C%EB%B0%9C-%EC%B4%88%EB%B3%B4-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EB%A1%9C%EB%93%9C%EB%A7%B5-%EB%8B%A4%EC%9E%87%EC%86%8C&unitId=187133
- https://acdongpgm.tistory.com/159
- https://webclub.tistory.com/71
