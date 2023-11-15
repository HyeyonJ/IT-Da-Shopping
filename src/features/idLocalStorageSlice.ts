import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface likeDataState {
  like: number;
  id: any;
}

// const initialState: DataState[] = [];
const initialState: likeDataState = {
  like: 0,
  id: null
};

export const likeDataSlice = createSlice({
  name: "idLocalStorage",
  initialState,
  reducers: {
    setIdLocalStorageRdx: (state, action: PayloadAction<likeDataState[]>) => {
      return { ...state, ...action.payload };
    }
  }
});

export const { setIdLocalStorageRdx } = likeDataSlice.actions;
export default likeDataSlice.reducer;

// // idLocalStorageSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface IdLocalStorageState {
//   data: { [key: string]: string };
// }

// const initialState: IdLocalStorageState = {
//   data: {}
// };

// export const idLocalStorageSlice = createSlice({
//   name: "idLocalStorage",
//   initialState,
//   reducers: {
//     setIdLocalStorage: (
//       state,
//       action: PayloadAction<{ [key: string]: string }>
//     ) => {
//       state.data = action.payload;
//     }
//   }
// });

// export const { setIdLocalStorage } = idLocalStorageSlice.actions;
// export default idLocalStorageSlice.reducer;
