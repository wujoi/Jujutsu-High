import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchCampusAsync = createAsyncThunk("campuses/fetch", async () => {
  try {
    const { data } = await axios.get(`/api/campuses`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const addCampusAsync = createAsyncThunk("campuses/post", async ({ name, description, imageUrl, address }) => {
  try {
    if(!imageUrl || imageUrl.length < 1){
      imageUrl = '/images/campus/default.png';
    }
    const { data } = await axios.post(`/api/campuses`, {
      name: name, 
      description: description, 
      imageUrl: imageUrl, 
      address: address,
    })
    return data;
  } catch (error) {
    return error.message;
  }
});

export const campusSlice = createSlice({
  name: "campus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCampusAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addCampusAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export const selectCampus = (state) => {
  return state.campus;
};
export default campusSlice.reducer;