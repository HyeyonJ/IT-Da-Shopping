<img width="100%" alt="chatting" src="https://github.com/HyeyonJ/IT-Da-Shopping/assets/113879120/ebf0c8b0-99ad-463b-a06b-f611d176524c.gif">

<div align="center">
  
## IT-DA shop
네이버 스마트 스토어의 수요가 많은 상품을 알아보려 했지만 어려움을 겪으셨나요?<br>
"IT-DA shop(잇다샵)"은 공동구매 수요 조사 공간을 제공하는 서비스입니다.<br><br>

</div>

  
## 목차


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
최근 부업으로 스마트 스토어 판매가 떠오르고 있습니다. <br>
그러나 어떤 상품을 팔아야 할지, 사람들의 수요를 파악하기가 어려워 고민 중인 초보 판매자를 위한 고민으로 시작했습니다. <br>
이에 자유롭게 원하는 상품을 제안하고 투표를 통해 수요를 파악할 수 있는 공간을 만들어보았습니다. 
</blockquote>

### 프로젝트 링크
<blockquote>
  
최종 배포 링크 : https://d1tixhtkjf74lp.cloudfront.net/

</blockquote>
<br>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>
<br>

## `2. 기술 스택`

<div align="center">
  
<img width="80%" alt="스크린샷 2023-11-16 172640" src="https://github.com/HyeyonJ/IT-Da-Shopping/assets/113879120/3f8400e2-630e-405d-82f3-81ba72b81f42">

</div>

<br>

<p align="right"><a href="#목차">⬆ 목차로 돌아가기</a></p>
<br>

## `3. 설계 및 아키텍처`

### ⚙️ Architecture

<div>
<img width="100%" alt="스크린샷 2023-11-16 173007" src="https://github.com/HyeyonJ/IT-Da-Shopping/assets/113879120/fd153b94-ce19-4196-a144-5e5150a7fb67">
</div>


<br>


### ⚙️ GET

#### 🔹 상품 목록 리스트 요청

<img width="100%" alt="스크린샷 2023-11-28 170311" src="https://github.com/HyeyonJ/IT-Da-Shopping/assets/113879120/a84f2cf1-f5b6-423c-aa32-5e47fc5099fd">

 - 페이지가 정상적으로 요청되었을 시 react query로 상품 리스트를 불러옵니다.
 - Redux에 상품 리스트를 저장합니다.

#### 🔹 IP 주소 요청

<img width="100%" alt="스크린샷 2023-11-28 171208" src="https://github.com/HyeyonJ/IT-Da-Shopping/assets/113879120/1f45b12a-870f-4c93-9890-6242ceb0b696">

 - 해당 쇼핑몰의 접근성을 높이기 위해 회원가입 후 로그인 입장이 아닌, IP 기반으로 사용자를 구분할 수 있도록 만들었습니다.


#### 🔹

<img width="100%" alt="archtectuer" src="https://github.com/HyeyonJ/room-of-GUZZI/assets/113879120/4caab2c5-2539-46b0-b616-6ba37849221c.png">

- Input에 이미지 값이 없을 시 SEND 버튼을 비활성화 합니다. 이는 NULL 값이 POST 되지 않기 위함입니다.
- Input에 이미지 값 입력 시 TextField는 disabled로 비활성화 하였습니다.
<br>

### ⚙️ POST

#### 🔹프로젝트 만들기

<img width="407" alt="스크린샷 2023-11-28 174253" src="https://github.com/HyeyonJ/IT-Da-Shopping/assets/113879120/2e8f4b9a-c7e5-48ea-a867-f7e3f3c24711">

 - TextField에 값이 없을 시 regex로 유효성 검사를 시행하도록 만들었습니다.
 - 제출하기 버튼을 누를 시 Home으로 가고, 리스트를 추가하도록 만들었습니다.

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
