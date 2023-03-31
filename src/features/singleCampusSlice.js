import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const fetchSingleCampus = createAsyncThunk("singleCampus", async (id) => {
  try {
    const { data } = await axios.get(`/api/campuses/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const updateCampus = createAsyncThunk(
  "updateCampus",
  async ({ id, name, description, imageUrl, address }) => {
    const { data } = await axios.put(`/api/campuses/${id}`, {
      id: id,
      name: name,
      description: description,
      imageUrl: imageUrl,
      address: address,
    });
    return data;
  }
);

export const deleteCampus = createAsyncThunk(
  "deleteCampus",
  async ({ id }) => {
    const { data } = await axios.delete(`/api/campuses/${id}`);
    return data;
  }
);

export const singleCampusSlice = createSlice({
  name: "singleCampus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleCampus.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updateCampus.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteCampus.fulfilled, (state, action) => {
      return {};
    });
  },
});

export const selectSingleCampus = (state) => {
  return state.singleCampus;
};

export default singleCampusSlice.reducer;
