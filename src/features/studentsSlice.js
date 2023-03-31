import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];
let currentData = [];

export const fetchStudentsAsync = createAsyncThunk("students/fetch", async () => {
  try {
    const { data } = await axios.get(`/api/students`);
    currentData = data;
    return data;
  } catch (err) {
    console.log(err);
  }
});

export const addStudentAsync = createAsyncThunk("students/post", async ({ firstName, lastName, imageUrl, email, gpa, campus }) => {
  try {
    if(!imageUrl || imageUrl.length < 1){
      imageUrl = '/images/students/default.png';
    }
    const { data } = await axios.post(`/api/students`, {
      firstName: firstName, 
      lastName: lastName, 
      imageUrl: imageUrl, 
      email: email, 
      gpa: gpa,
      campusId: campus.id,
    });
    return data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
});

export const fetchFilteredStudents = createAsyncThunk("students/fetchFiltered", async (filterValue) => {
  try {
    const { data } = await axios.get(`/api/students`);
    const filteredData = [];
    data.forEach((student) => {
      if(!filterValue){
        if(student.campusId === filterValue){
          filteredData.push(student);
        }
      } else if (student.campusId === parseInt(filterValue)){
        filteredData.push(student);
      }
    });
    currentData = filteredData
    return filteredData;
  } catch (err) {
    console.log(err);
  }
});

export const fetchSortedStudents = createAsyncThunk("students/fetchSorted", async (sortValue) => {
  try {
    let sortedStudents = [...currentData];
        if (sortValue === 'firstName') {
            sortedStudents.sort((a, b) => a.firstName.localeCompare(b.firstName));
        } else if (sortValue === 'lastName') {
            sortedStudents.sort((a, b) => a.lastName.localeCompare(b.lastName));
        } else if (sortValue === 'gpa') {
            sortedStudents.sort((a, b) => b.gpa - a.gpa);
        }
    return sortedStudents;
  } catch (err) {
    console.log(err);
  }
});

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudentsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addStudentAsync, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(fetchFilteredStudents.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchSortedStudents.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectStudents = (state) => {
  return state.students;
};
export default studentsSlice.reducer;