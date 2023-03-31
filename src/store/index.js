import { configureStore } from "@reduxjs/toolkit";
import campusSlice from "../features/campusSlice";
import studentsSlice from "../features/studentsSlice";
import singleCampusSlice from "../features/singleCampusSlice";
import singleStudentSlice from "../features/singleStudentSlice";


const store = configureStore({
  reducer: {
    campus: campusSlice,
    students: studentsSlice,
    singleCampus: singleCampusSlice,
    singleStudent: singleStudentSlice,
  }
});

export default store;