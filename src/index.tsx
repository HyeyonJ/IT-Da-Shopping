import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Home } from "./pages/Home";
import { MakeProject } from "./pages/MakeProject";
import { DetailPage } from "./pages/DetailPage";
import { StyledEngineProvider } from "@mui/system";
// import { StyledEngineProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/makeProject",
    element: <MakeProject />
  },
  {
    path: "/detail/:id",
    element: <DetailPage />
  }
]);

const cache = createCache({
  key: "css",
  prepend: true
});

ReactDOM.createRoot(document.getElementById("root") as any).render(
  <React.StrictMode>
    <Provider store={store}>
      <CacheProvider value={cache}>
        <StyledEngineProvider injectFirst>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {/* <Router>{router}</Router> */}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </StyledEngineProvider>
      </CacheProvider>
    </Provider>
  </React.StrictMode>
);
