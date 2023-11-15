// store
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import dataReducer from "../features/dataSlice";
import idLocalStorageReducer from "../features/idLocalStorageSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // 로컬 스토리지 사용
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root", // 저장될 키 (이름)
  storage,
  serialize: true, // 이 부분을 추가해줍니다.
  blacklist: ["persist/PURGE"],
};

const rootReducer = combineReducers({
  data: dataReducer,
  idLocalStorage: idLocalStorageReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer // 기존의 리듀서를 대체
  // reducer : rootReducer
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// // store.ts
// import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// import dataReducer from "../features/dataSlice";
// import idLocalStorageReducer from "../features/idLocalStorageSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // 로컬 스토리지 사용
// import { combineReducers } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root", // 저장될 키 (이름)
//   storage,
//   serialize: true, // 이 부분을 추가해줍니다.
//   blacklist: ["persist/PURGE"],
// };

// const rootReducer = combineReducers({
//   data: dataReducer,
//   idLocalStorage: idLocalStorageReducer
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer // 기존의 리듀서를 대체
// });

// export const persistor = persistStore(store);

// // const persistedReducer = persistReducer(
// //   persistConfig,
// //   combineReducers({
// //     data: dataReducer,
// //     idLocalStorage: idLocalStorageReducer
// //   })
// // );

// // export const store = configureStore({
// //   reducer: persistedReducer // 기존의 리듀서를 대체
// // });

// // export const persistor = persistStore(store);
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
