import * as React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavbarSub } from "../components/NavbarSub";
import { generateUUID } from "../components/generateUUID";
import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

interface ProjectData {
  id: any;
  title: any;
  url: any;
  description: any;
  password: any;
  timestamp: any;
  price: any;
  num: any;
  like: any;
  shoplink: any;
  photourl: any;
}

export function MakeProject() {
  const SERVER = process.env.REACT_APP_SERVER;
  // 1. id
  const [id, setId] = useState<any>(generateUUID);
  // 2. title 유효성
  const [title, setTitle] = useState<String>("");
  const [isTitleValid, setIsTitleValid] = useState<boolean>(false);
  // 3. url 유효성
  const [url, setUrl] = useState<string>("");
  const [isUrlValid, setIsUrlValid] = useState<boolean>(false);
  // 4. price 유효성
  const [price, setPrice] = useState<number>(); // 입력 값 number 타입으로 저장
  const [isPriceValid, setIsPriceVaild] = useState<boolean>(false); // 입력 값 문자열로 저장
  // 5. description 유효성
  const [description, setDescription] = useState<String>("");
  const [isDescriptionValid, setIsDescriptionValid] = useState<boolean>(false);
  // 6. password 유효성
  const [password, setPassword] = useState<String>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  // 7. timestamp
  const timestamp = new Date();
  // 8. num
  const [num, setNum] = useState<number>(10);
  // 9. like
  const [like, setLike] = useState<number>(0);
  // 10. shopLink 나중에 제공할 쇼핑 링크
  const [shoplink, setShoplink] = useState<String>("");
  // 11. photourl
  const [photourl, setPhotourl] = useState<String>("");

  const queryClient = useQueryClient();
  // for mutation
  const navigate = useNavigate();

  // 1. id (uuid 랜덤 제공)
  const generateNewUUID = () => {
    const newUuid = generateUUID();
    setId(newUuid);
  };

  // 2. 제목
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = event.target.value;
    const isValidTitle = /[!@#$%^&*(),.?":{}|<>]/.test(titleValue);

    setTitle(titleValue);

    // null 값 POST 불가
    if (titleValue.trim() === "") {
      setIsTitleValid(false);
      return;
    }

    // 특수 문자 입력 불가
    if (isValidTitle) {
      setIsTitleValid(false);
    } else {
      setIsTitleValid(true);
    }
  };

  // 3. url
  const validateUrl = (url: string): boolean => {
    const validPatterns = [/^https:\/\/(.*\.)?naver\.com\/.*/];

    return validPatterns.some((pattern) => pattern.test(url));
  };

  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const urlValue = event.target.value;
    setUrl(urlValue);

    const isUrlValid = validateUrl(urlValue);
    setIsUrlValid(isUrlValid);
  };

  // 4. 가격
  const addComma = (price: string) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let numericValue = parseFloat(value.replaceAll(",", ""));
    console.log(numericValue);
    console.log(typeof numericValue);
    setPrice(numericValue);

    if (isNaN(numericValue)) {
      setPrice(0);
      setIsPriceVaild(false);
    } else {
      setIsPriceVaild(true);
    }
  };

  //5. 설명
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const descriptionValue = event.target.value;

    // 공백을 제거한 값이 빈 문자열이라면 유효하지 않음
    if (descriptionValue.trim() === "") {
      setIsDescriptionValid(false);
    } else {
      setIsDescriptionValid(true);
    }
    setDescription(descriptionValue);
  };

  // 6. 비밀번호
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value;
    const isValidPassword = /^\d{4}$/.test(passwordValue);

    setPassword(passwordValue);

    if (isValidPassword) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  // POSt/items (react query)
  const mutation = useMutation({
    mutationFn: async (body: ProjectData) => {
      console.log("여기인가 :" + JSON.stringify(body));

      const res = await fetch(`${SERVER}/items`, {
        method: "POST",
        body: JSON.stringify(body)
      });

      console.log(res);
      if (res.ok) {
        const json = await res.json();
        console.log(json);
      }
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: (error: any) => {
      console.error("Error saving data:", error);
    }
  });

  // onSubmit;
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !url || !price || !description || !password) {
      console.error("Error: Some values are null.");
      return;
    }

    console.log(title);
    console.log(url);
    console.log(description);
    console.log(password);
    console.log(shoplink);
    console.log(price);
    console.log(timestamp);
    console.log(num);
    console.log(like);
    console.log(id);

    const data: ProjectData = {
      id: id,
      title: title,
      url: url,
      description: description,
      password: password,
      timestamp: timestamp,
      price: price,
      num: num,
      like: like,
      shoplink: shoplink,
      photourl: photourl
    };

    // useMutation을 통해 POST 요청 보내기
    mutation.mutate(data);
  };

  return (
    <>
      <NavbarSub />
      <Box className="text-center my-20">
        <Typography className="text-3xl font-bold tracking-wide m-4">
          CO BUYING, MAKE GROUPS
        </Typography>
        <Typography className="text-slate-300 m-7">
          저렴하게 구매하길 원하는 상품을 등록해주세요!
        </Typography>

        <Grid className="w-[450px] mx-auto">
          <Box
            component="form"
            className="flex flex-col items-center"
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <Box className="hidden">
              <Box>{id}</Box>
              <Box>{timestamp.toLocaleString()}</Box>
              <Box>{num}</Box>
              <Box>{like}</Box>
              <Box>{shoplink}</Box>
              <Box>{photourl}</Box>
            </Box>
            <TextField
              fullWidth
              id="title"
              type="text"
              label="제목"
              variant="outlined"
              value={title}
              onChange={handleTitleChange}
              helperText={
                isTitleValid
                  ? "유효한 제목입니다."
                  : "특수문자를 제외한 제목을 입력해주세요."
              }
              error={!isTitleValid}
              className="m-2"
            />
            <TextField
              fullWidth
              id="link"
              type="text"
              label="제품 링크"
              variant="outlined"
              value={url}
              onChange={handleLinkChange}
              helperText={
                isUrlValid
                  ? "유효한 링크입니다."
                  : "네이버에서 원하는 상품의 링크를 입력해주세요."
              }
              error={!isUrlValid}
              className="m-2"
            />
            <Grid container spacing={2} className="m-2 w-full mx-auto">
              <Grid xs={8}>
                <TextField
                  fullWidth
                  id="price"
                  type="text"
                  label="제품 희망 가격"
                  variant="outlined"
                  // value={addComma(price) || ""}
                  value={price}
                  onChange={handlePriceChange}
                  helperText={
                    isPriceValid
                      ? "유효한 가격입니다."
                      : "공구 시 희망 가격을 입력해주세요."
                  }
                  error={!isPriceValid}
                />
              </Grid>
              <Grid xs={4} className="flex items-center">
                원
              </Grid>
            </Grid>
            <TextField
              fullWidth
              id="description"
              type="text"
              label="상품 설명"
              multiline
              rows={4}
              value={description}
              onChange={handleDescriptionChange}
              helperText={
                isDescriptionValid
                  ? "유효한 설명입니다."
                  : "다른 사람들에게 이 제품에 대한 흥미로운 점을 알려주세요."
              }
              error={!isDescriptionValid}
            />
            <Typography className="mt-9"></Typography>
            <Typography className="m-2 text-gray-500 text-center">
              제품 수정과 삭제 시 필요한 비밀번호를 입력 바랍니다.
            </Typography>
            <TextField
              fullWidth
              id="password"
              type="text"
              label="비밀번호"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              helperText={
                isPasswordValid
                  ? "유효한 비밀번호입니다."
                  : "숫자 4자리를 입력해주세요."
              }
              error={!isPasswordValid}
            />
            <Button
              type="submit"
              variant="contained"
              className="bg-blue-800 mt-5"
              fullWidth
            >
              제출하기
            </Button>
          </Box>
        </Grid>
      </Box>
    </>
  );
}
