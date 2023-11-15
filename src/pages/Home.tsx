import * as React from "react";
import { Link, json } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Form, useLoaderData } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { useParams } from "react-router";
import { Navbar } from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../features/dataSlice";
import { setIdLocalStorageRdx } from "../features/idLocalStorageSlice";
// import { persistor } from "../app/store"; // 추가

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

interface DataForRedux {
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

interface likeData {
  like: number;
  id: string;
}

export function Home() {
  const spacing = 1;

  const SERVER = process.env.REACT_APP_SERVER;

  // 로컬스토리지 state
  const [idLocalStorage, setIdLocalStorage] = useState<{
    [key: string]: string;
  }>({ name: "" });

  // 로컬스토리지 useEffect
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const storedData = localStorage.getItem("idInShop");
      const parsedData = storedData ? JSON.parse(storedData) : {};

      setIdLocalStorage(parsedData);
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // GET data
  const { data, isLoading, error } = useQuery<Data, Error>({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await fetch(`${SERVER}/items`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      return jsonData as Data;
    }
  });

  const dispatch = useDispatch();

  const convertDataToDataStateArray = (data: Data): DataForRedux[] => {

    // 실제로 데이터를 DataState로 변환하는 로직을 여기에 작성
    return [
      {
        password: data.password,
        num: data.num,
        timestamp: data.timestamp,
        like: data.like,
        shoplink: data.shoplink,
        description: data.description,
        id: data.id,
        price: data.price,
        url: data.url,
        title: data.title,
        photourl: data.photourl,
      },
    ];
  };

  // redux
  // useEffect(() => {
  //   // console.log("useEffect안의 데이터 : " + JSON.stringify(data));
  //   const timeout = setTimeout(() => {
  //     if (data) {
  //       // dispatch(setData(data));
  //       const convertedData = convertDataToDataStateArray(data);
  //       dispatch(setData(convertedData));
  //     }
  //   }, 0);
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, [data, dispatch]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (data) {
        const convertedData = convertDataToDataStateArray(data);
        dispatch(setData(convertedData)); // 배열 형태로 감싸주지 않음
      }
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, [data, dispatch]);

  const dataRdx = useSelector((state: any) => state.data);

  console.log("data : " +JSON.stringify(data))
  
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const storedData = localStorage.getItem("idInShop");
      const parsedData = storedData ? JSON.parse(storedData) : {};
      setIdLocalStorage(parsedData);
      dispatch(setIdLocalStorageRdx(parsedData));
    }, 0);
    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch]);
  // 로컬스토리지 persist
  // useEffect(() => {
  //   // 스토어 초기화 후 로컬 스토리지에서 데이터 로드
  //   persistor.purge().then(() => {
  //     const timeout = setTimeout(async () => {
  //       const storedData = localStorage.getItem("idInShop");
  //       const parsedData = storedData ? JSON.parse(storedData) : {};

  //       setIdLocalStorage(parsedData);
  //       dispatch(setIdLocalStorageRdx(parsedData));
  //     }, 0);
  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   });
  // }, [dispatch]);

  const mutation = useMutation({
    mutationFn: async (likeform: likeData) => {
      // console.log("likeform.id : " + likeform.id);
      // console.log("likeform.like : " + likeform.like);
      // console.log("data관련" + JSON.stringify(data));

      const res = await fetch(`${SERVER}/like/${likeform.id}`, {
        method: "PUT",
        body: JSON.stringify({ like: likeform.like })
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return likeform;
    },
    onSuccess: (updateData: any) => {}
  });

  const handleLikeClick = async (abcd: string) => {
    console.log("여기는 handleLikeClick입니다 :" + abcd);

    // localStorage에 저장된 값을 먼저 부른다.
    const storedData = localStorage.getItem("idInShop");
    const parsedData = storedData ? JSON.parse(storedData) : {};

    parsedData[abcd] = "true";
    // targetItem에 id 값을 저장한다.
    // const targetIdObject = data.find((item: any) => item.id === abcd);
    // const targetIdObject = data?.find((item: any) => item.id === abcd);
    // const targetIdObject = data !== undefined ? data.find((item: any) => item.id === abcd) : undefined;
    const targetIdObject = Array.isArray(data) ? data.find((item: any) => item.id === abcd) : undefined;
    console.log("targetIDObject : " + JSON.stringify(targetIdObject));

    if (targetIdObject) {
      // redux
      dispatch(setIdLocalStorageRdx({ ...parsedData }));

      localStorage.setItem("idInShop", JSON.stringify(parsedData));

      setIdLocalStorage((prev) => {
        return {
          ...prev,
          ...parsedData
        };
      });

      const likeInObject = targetIdObject.like;
      // console.log("likeAsString : " + likeInObject);
      const addLike = likeInObject + 1;
      // console.log("increaseString : " + addLike);

      //redux
      dispatch(
        setData(
          dataRdx.map((item: Data) =>
            item.id === abcd ? { ...item, like: addLike } : item
          )
        )
      );

      mutation.mutate({ like: addLike, id: abcd });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }

  return (
    <Box>
      <Navbar />
      <Box className="m-12">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} sm={6}>
            <Typography className="text-3xl font-bold tracking-wide m-4">
              CO BUYING,
            </Typography>
            <Typography className="text-3xl font-bold tracking-wide m-4">
              MAKE GROUPS
            </Typography>
            <Typography className="m-4 text-slate-400">
              가지고 싶은 물건을 모두 알려주세요
            </Typography>
            <Link to="/makeProject">
              <Button
                variant="contained"
                className="m-4 transition ease-in-out delay-150 bg-blue-800 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ... "
              >
                프로젝트 만들기
              </Button>
            </Link>
            <Card className="max-w-full mb-8 m-4 rounded-3xl">
              <CardMedia
                component="img"
                image="/forProgrammer.png"
                alt="For programmer"
                className="h-95"
              />
            </Card>
          </Grid>
          <Grid xs={12} sm={6}>
            <Card className="max-w-full m-4 rounded-3xl">
              <CardMedia
                component="img"
                image="/programmerThe.png"
                alt="Paella dish"
                className="h-95"
              />
            </Card>
            <Card className="max-w-full mx-4 sm:mb-2 rounded-3xl h-52 bg-blue-900 flex justify-center items-center">
              <CardContent>
                <Typography
                  variant="body2"
                  color="white"
                  className="text-white text-2xl"
                  sx={{
                    fontFamily: "Do Hyeon"
                  }}
                >
                  다양한 런칭 상품 구경해보세요!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box className="border border-gray-200 mt-20"></Box>
        <Typography className="mt-16 mb-12 text-2xl font-bold">
          상품 목록
        </Typography>

        <Grid container spacing={spacing}>
          {/* {data?.map((items: any) => ( */}
          {Array.isArray(dataRdx) &&
            dataRdx.map((items: any, i) => (
              <Grid xs={12} sm={6} md={4} key={items.id}>
                <Card className="mb-8 mx-4 sm:mx-0 sm:mb-2 rounded-3xl">
                  <CardMedia
                    component="img"
                    image="/heart.jpg"
                    alt="image"
                    className="h-60"
                  />
                  <CardContent>
                    <Box>
                      <Typography
                        variant="body2"
                        className="text-textSecondary text-2xl font-bold"
                      >
                        {items.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-textSecondary"
                      >
                        {items.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-textSecondary"
                      >
                        좋아요 수 : {items.like}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions disableSpacing className="flex justify-end">
                    <Link to={`/detail/${items.id}`} key={items.id}>
                      <Button>show More</Button>
                    </Link>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => handleLikeClick(items.id)}
                      color={idLocalStorage[items.id] ? "primary" : "secondary"}
                      disabled={!!idLocalStorage[items.id]}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
