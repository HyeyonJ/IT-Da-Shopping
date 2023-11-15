import * as React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { TextField } from "@mui/material";
import { useParams } from "react-router";
import { Link, json } from "react-router-dom";
import { NavbarSub } from "../components/NavbarSub";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../features/dataSlice";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface Data {
  password: any;
  num: any;
  timestamp: any;
  like: number;
  shoplink: any;
  description: any;
  id: any;
  price: any;
  url: any;
  title: any;
  photourl: any;
}

export function DetailPage() {
  const SERVER = process.env.REACT_APP_SERVER;
  const { id } = useParams();
  const navigate = useNavigate();

  const dataRdxDetail = useSelector((state: any) => state.data);
  const rdxItem = dataRdxDetail.find((item: any) => item.id === id);

  if (rdxItem) {
    // 일치하는 객체를 찾았을 때의 처리
    console.log("일치하는 객체를 찾았습니다:", rdxItem);
  } else {
    // 일치하는 객체를 찾지 못했을 때의 처리
    console.log("일치하는 객체를 찾지 못했습니다.");
  }

  // 수정 시 비밀번호 확인
  const [updatePassword, setUpdatePassword] = useState<String>("");
  // 수정 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 글 삭제 시 비밀번호 확인 관련
  const [deletePassword, setDeletePassword] = useState<String>("");
  // 삭제 모달이 열려있는지 여부를 저장하는 상태 변수
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 2. title 유효성
  const [title, setTitle] = useState<String>(rdxItem.title);
  const [isTitleValid, setIsTitleValid] = useState<boolean>(false);
  // 3. url 유효성
  const [url, setUrl] = useState<string>(rdxItem.url);
  // 4. price 유효성
  const [price, setPrice] = useState<any>(rdxItem.price); // 입력 값 number 타입으로 저장
  const [isPriceValid, setIsPriceVaild] = useState<boolean>(false); // 입력 값 문자열로 저장
  // 5. description 유효성
  const [description, setDescription] = useState<String>(rdxItem.description);
  const [isDescriptionValid, setIsDescriptionValid] = useState<boolean>(false);
  // 6. password 유효성
  const [password, setPassword] = useState<String>(rdxItem.password);
  // 7. timestamp
  const [timestamp, setTimestamp] = useState<any>(rdxItem.timestamp);
  // 8. num
  const [num, setNum] = useState<number>(rdxItem.num);
  // 9. like
  const [like, setLike] = useState<number>(rdxItem.like);
  // 10. shopLink 나중에 제공할 쇼핑 링크
  const [shoplink, setShoplink] = useState<String>(rdxItem.shopLink);
  // 11. photourl
  const [photourl, setPhotourl] = useState<String>(rdxItem.photourl);

  // 2. title 유효성
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

  // 4. price 유효성
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

  //5. description 유효성
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

  // 수정 모달
  const openUpdateModal = () => {
    setUpdatePassword("");
    setIsModalOpen(true);
    setTimestamp(rdxItem.timestamp);
    setTitle(rdxItem.title);
    setUrl(rdxItem.url);
    setPrice(rdxItem.price);
    setDescription(rdxItem.description);
    setPassword(rdxItem.password);
    setNum(rdxItem.num);
    setLike(rdxItem.like);
    setShoplink(rdxItem.shoplink);
    setPhotourl(rdxItem.photourl);
  };

  const closeUpdateModal = () => {
    setIsModalOpen(false);
    // setUpdatePassword("");
    setTitle(rdxItem.title);
    setPrice(rdxItem.price);
    setDescription(rdxItem.description);
  };

  // 수정 mutation
  const mutationUpdate = useMutation({
    mutationFn: async (body: Data) => {
      const res = await fetch(`${SERVER}/item/${id}`, {
        method: "PUT",
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const text = await res.text();
        console.log("json은" + text);
        // queryClient.invalidateQueries(["data"]);
      }
    },
    onSuccess: () => {
      console.log("onSuccess");
      navigate("/");
    },
    onError: (error: any) => {
      console.error("Error saving data:", error);
    }
  });

  // 수정 관련 click
  const handleUpdateConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("title : " + title);
    console.log("url : " + url);
    console.log("description : " + description);
    console.log("password : " + password);
    console.log("shoplink : " + shoplink);
    console.log("price : " + price);
    console.log("timestamp : " + timestamp);
    console.log("num : " + num);
    console.log("like : " + like);
    console.log("id ; " + id);

    if (!title || !price || !description) {
      console.error("Error: Some values are null.");
      return;
    }

    const updatedata: Data = {
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

    mutationUpdate.mutate(updatedata);
  };

  // 삭제 모달
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletePassword("");
  };

  // 삭제 mutation
  const mutationDelete = useMutation({
    mutationFn: async (id: any) => {
      const res = await fetch(`${SERVER}/item/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    },
    onSuccess: () => {
      navigate("/");
    }
    // onError: err
  });

  // 삭제 click
  const handleDeleteConfirm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (deletePassword !== rdxItem.password) {
      // 비밀번호가 일치하지 않는 경우 여기서 처리
      console.error("비밀번호가 틀렸습니다.");
      return;
    }

    try {
      await mutationDelete.mutateAsync(id);
      // 성공적으로 삭제되었을 때 실행할 코드를 여기에 추가
    } catch (error) {
      // 에러 발생 시 실행할 코드를 여기에 추가
      console.error("삭제 중에 오류가 발생했습니다:", error);
    }
  };

  return (
    <Box>
      <NavbarSub />
      <Box className="w-full mt-8">
        <Grid className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-x-12 gap-y-6">
          <Grid className="max-w-full mb-2 sm:mb-0">
            <Card className="ml-10 rounded-2xl overflow-hidden">
              <CardMedia
                component="img"
                image="/heart.jpg"
                alt="image"
                className=" h-100 object-cover"
              />
            </Card>
          </Grid>
          <Grid xs={12} sm={6} md={6}>
            <Typography className="hidden">{id}</Typography>
            <Box className="mt-12">
              <Typography className="text-3xl mb-5">{rdxItem.title}</Typography>
              <Box className="border border-silver w-5/6"></Box>
            </Box>
            <Button
              onClick={() => window.open(rdxItem.url, "_blank")}
              variant="contained"
              className="mt-6 transition ease-in-out delay-150 bg-blue-800 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ... "
            >
              제품링크
            </Button>
            <Typography className="mt-4">좋아요 : {rdxItem.like} 명</Typography>

            <Typography className="mt-4">가격 : {rdxItem.price} 원</Typography>
            <Typography sx={{ marginTop: "3vh" }}>설명</Typography>
            <Box className="mt-4 w-5/6 h-40 text-silver flex items-center rounded-2xl shadow-md border-2 border-silver">
              <Box className="mx-3"></Box>
              {rdxItem.description}
            </Box>
            <Box className="mt-9 flex justify-center items-center space-x-4">
              <Button variant="outlined" onClick={openUpdateModal}>
                수정
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={openDeleteModal}
              >
                삭제
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* 수정 모달 */}
      <Box
        component="form"
        className="flex flex-col items-center"
        noValidate
        autoComplete="off"
        onSubmit={handleUpdateConfirm}
      >
        <Dialog
          open={isModalOpen}
          onClose={closeUpdateModal}
          PaperProps={{ style: { width: "700px" } }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>상품 수정</DialogTitle>
          <Box className="border border-silver border-2"></Box>
          <DialogContent>
            <Typography className="text-center text-gray-300">
              비밀번호를 입력해주세요.
            </Typography>
            <TextField
              fullWidth
              id="deletePassword"
              type="text"
              label="비밀번호 입력"
              variant="outlined"
              value={updatePassword}
              className="mt-7"
              onChange={(event: any) => setUpdatePassword(event.target.value)}
              error={!updatePassword === rdxItem.password}
            ></TextField>
            {updatePassword === rdxItem.password ? (
              <>
                <Box className="hidden">
                  <Box>1. {id}</Box>
                  <Box>2. {rdxItem.timestamp}</Box>
                  <Box>
                    3. {rdxItem.num} / {num}
                  </Box>
                  <Box>
                    4. {rdxItem.like} / {like}
                  </Box>
                  <Box>
                    5. {rdxItem.url} / {url}
                  </Box>
                  <Box>
                    6. {rdxItem.password} / {password}
                  </Box>
                  <Box>
                    7. {rdxItem.shoplink} / {shoplink}
                  </Box>
                  <Box>
                    8. {rdxItem.photourl} / {photourl}
                  </Box>
                </Box>
                <TextField
                  fullWidth
                  id="title"
                  type="text"
                  label="상품 제목"
                  variant="outlined"
                  value={title}
                  onChange={handleTitleChange}
                  helperText={
                    isTitleValid
                      ? "유효한 제목입니다."
                      : "특수문자를 제외한 제목을 입력해주세요."
                  }
                  error={!isTitleValid}
                  className="mt-10"
                />
                <TextField
                  fullWidth
                  id="price"
                  type="text"
                  label="상품 가격"
                  variant="outlined"
                  value={price}
                  onChange={handlePriceChange}
                  helperText={
                    isPriceValid
                      ? "유효한 가격입니다."
                      : "공구 시 희망 가격을 입력해주세요."
                  }
                  error={!isPriceValid}
                  className="mt-10"
                />
                <TextField
                  fullWidth
                  type="text"
                  label="상품 설명"
                  variant="outlined"
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
                  className="mt-10"
                />
              </>
            ) : (
              ""
            )}
          </DialogContent>
          <DialogActions>
            {updatePassword === rdxItem.password ? (
              <Button type="submit" onClick={handleUpdateConfirm}>
                확인
              </Button>
            ) : (
              ""
            )}
            <Button onClick={closeUpdateModal} color="error">
              닫기
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      {/* 삭제 모달 */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={closeDeleteModal}
        PaperProps={{ style: { width: "700px", height: "300px" } }}
      >
        <DialogTitle style={{ textAlign: "center" }}>상품 삭제</DialogTitle>
        <Box className="border border-silver border-2"></Box>

        <DialogContent>
          <Typography className="text-center text-red-500">
            삭제 후 글 복구는 불가능합니다. <br />글 작성 시 사용했던 비밀번호를
            입력해주세요.
          </Typography>
          <Box className="hidden">
            <Box>{id}</Box>
            <Box>{rdxItem.timestamp}</Box>
            <Box>{rdxItem.num}</Box>
            <Box>{rdxItem.like}</Box>
            <Box>{rdxItem.shoplink}</Box>
            <Box>{rdxItem.url}</Box>
            <Box>{rdxItem.photourl}</Box>
          </Box>
          <TextField
            fullWidth
            id="deletePassword"
            type="text"
            label="비밀번호 입력"
            variant="outlined"
            value={deletePassword}
            className="mt-7"
            onChange={(event: any) => setDeletePassword(event.target.value)}
            // helperText={
            //   deletePassword === data.password
            //     ? "비밀번호가 올바르게 작성되었습니다."
            //     : "비밀번호가 틀렸습니다."
            // }
            error={!deletePassword === rdxItem.password}
          ></TextField>
        </DialogContent>
        <DialogActions>
          {deletePassword === rdxItem.password ? (
            <Button onClick={handleDeleteConfirm}>확인</Button>
          ) : (
            ""
          )}

          <Button onClick={closeDeleteModal} color="error">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
