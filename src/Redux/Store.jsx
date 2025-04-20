import { configureStore } from "@reduxjs/toolkit";
import PromptReducer from "./Slice";

const store = configureStore({
     reducer: {
          prompt: PromptReducer,
     },
});

export default store;