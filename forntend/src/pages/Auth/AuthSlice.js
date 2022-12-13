import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const logInHandler = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post("//localhost:4000/api/login", userData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ error: err.message });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [logInHandler.pending]: (state, action) => {
      state.status = "pending";
    },
    [logInHandler.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [logInHandler.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
