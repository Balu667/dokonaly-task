import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    user:{},
    status:'idle',
    error:null
}

export const logIn = createAsyncThunk('auth/login', async(userData,thunkAPI) => {
    try{
        console.log(userData)
        const res = await axios.post("//localhost:4000/api/login", userData)
        return res.data
    }catch(err){
        return thunkAPI.rejectWithValue({ error: err.message })
    }
    // const response = await fetch("//localhost:4000/api/login",{
    //     method:"POST",
    //     headers:{
    //       'Content-Type': 'application/json'
    //     },
    //     body:JSON.stringify(userDetails)
    // });
    // const data = await response.json();
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:{
        [logIn.fulfilled]: (state, action) => {
            // Add the new post created on the UI to the existing posts
            state.user = action.payload
          }, 
          [logIn.rejected]: (state, action) => {
              state.error = action.payload;
          }
    }
})

export default authSlice.reducer;