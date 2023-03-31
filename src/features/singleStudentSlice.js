import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const fetchSingleStudent = createAsyncThunk("singleStudent", async (id) => {
  try {
    const { data } = await axios.get(`/api/students/${id}`);
    // console.log(data, "data");
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const updateStudent = createAsyncThunk(
  "updateStudent",
  async ({ id, firstName, lastName, imageUrl, email, gpa, campus }) => {
    const { data } = await axios.put(`/api/students/${id}`, {
      firstName: firstName, 
      lastName: lastName, 
      imageUrl: imageUrl, 
      email: email, 
      gpa: gpa,
      campusId: campus.id,
    });
    return data;
  }
);

export const deleteStudent = createAsyncThunk(
  "deleteStudent",
  async ({ id }) => {
    const { data } = await axios.delete(`/api/students/${id}`);
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

export const singleStudentSlice = createSlice({
  name: "singleStudent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleStudent.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      return {};
    });
    builder.addCase(unregisterStudent.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectSingleStudent = (state) => {
  return state.singleStudent;
};

export default singleStudentSlice.reducer;
