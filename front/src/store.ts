import { combineReducers } from "redux";
import logger from "redux-logger";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userSlice, initialState as userInitialState } from "./modules/User";
import {
  presentationSlice,
  initialState as presentationInitialState,
} from "./modules/Presentation";

const rootReducer = combineReducers({
  userState: userSlice.reducer,
  presentationState: presentationSlice.reducer,
});

const preloadedState = () => {
  return {
    userState: userInitialState,
    presentationState: presentationInitialState,
  };
};

const store = () => {
  const middlewareList = [...getDefaultMiddleware(), logger];

  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: preloadedState(),
  });
};

export default store;
