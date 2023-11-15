import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface DataState {
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

// const initialState: DataState[] = [];
const initialState: DataState = {
  password: 0,
  num: 0,
  timestamp: 0,
  like: 0,
  shoplink: null, // You can replace 'any' with a proper default value or type
  description: null,
  id: null,
  price: null,
  url: null,
  title: null,
  photourl: null
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<DataState[], string>) => {
      // state.description = action.payload.description;
      // return { ...state, ...action.payload };
      return Object.assign(state, action.payload);
      // return action.payload;
    }
  }
});

// export const dataSlice = createSlice({
//   name: "data",
//   initialState,
//   reducers: {
//     setData: (state, action: PayloadAction<DataState[]>) => {
//       state.description = action.payload.description;
//       return action.payload;
//     }
//   }
// });

// 액션과 리듀서 보내기
export const { setData } = dataSlice.actions;
export default dataSlice.reducer;
