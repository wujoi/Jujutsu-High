import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const fetchSingleStudent = createAsyncThunk("singleStudent", async (id) => {
  try {
    const { data } = await axios.get(`/api/students/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const updateStudent = createAsyncThunk(
  "updateStudent",
  async ({ id, firstName, lastName, imageUrl, email, gpa, campus }) => {
    let campusId = null;
    if (campus && campus.id) {
      campusId = campus.id;
    }
    const { data } = await axios.put(`/api/students/${id}`, {
      firstName: firstName, 
      lastName: lastName, 
      imageUrl: imageUrl, 
      email: email, 
      gpa: gpa,
      campusId: campusId,
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
  },
});

export const selectSingleStudent = (state) => {
  return state.singleStudent;
};

export default singleStudentSlice.reducer;
