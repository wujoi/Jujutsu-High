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


export const unregisterStudent = createAsyncThunk(
  "unregisterStudent",
  async ({ id }) => {
    const { data } = await axios.put(`/api/students/${id}`, {
      campusId: null,
    });
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
    builder.addCase(unregisterStudent.fulfilled, (state, action) => {
      const filteredStudents = state.students.filter(student => student.id !== action.payload.id);
      return { ...state, students: filteredStudents };
    });
  },
});

export const selectSingleCampus = (state) => {
  return state.singleCampus;
};

export default singleCampusSlice.reducer;
