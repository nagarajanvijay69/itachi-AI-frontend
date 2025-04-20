import { createSlice } from '@reduxjs/toolkit';

export const PromptSlice = createSlice({
     name: 'prompt',
     initialState: {
          userPrompts: [],
          resPrompts: [],
          currentUser: "",
          tempuser : "",
          tempAI : "",
          datachat : []
     },
     reducers: {
          adduserPrompts: (state, action) => {
               state.userPrompts.push(action.payload);
          },
          addresPrompts: (state, action) => {
               state.resPrompts.push(action.payload);
          },
          deleteuserPrompts: (state, action) => {
               state.userPrompts = state.userPrompts.filter((value, index) => index !== action.payload);
          },
          deleteresPrompts: (state, action) => {
               state.resPrompts = state.resPrompts.filter((value, index) => index !== action.payload);
          },
          addcurrentUser: (state, action) => {
               state.currentUser = action.payload;
          },
          addtempuser: (state, action) => {
               state.tempuser = action.payload;
          },
          addtempAI: (state, action) => {
               state.tempAI = action.payload;
          },
          initdatachat : (state, action) =>{
                state.datachat = action.payload;
          },
          adddatachat : (state, action) =>{
               state.datachat.push(action.payload);
          },
          deletedatachat : (state, action) =>{
               state.datachat = state.datachat.filter((value, index) => index !== action.payload);
          }
     }
});

export const {
     addresPrompts, adduserPrompts,
     deleteresPrompts, deleteuserPrompts,
     addcurrentUser, addtempuser, addtempAI,
     initdatachat, adddatachat, deletedatachat
} = PromptSlice.actions;


export default PromptSlice.reducer;