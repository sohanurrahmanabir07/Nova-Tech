import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  logged: null,
 
};

const NovaStoreSlice = createSlice({
  name: "NovaStore",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users = action.payload
      console.log('from redux', state.users)

    },
    removeUser: (state, action) => {
      state.users = null
    }
   
  }
});

export const { addUser, removeUser } = NovaStoreSlice.actions;
export default NovaStoreSlice.reducer;
