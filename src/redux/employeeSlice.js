

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  empdata: null,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmpData: (state, action) => {
      state.empdata = action.payload;
    },
  },
});

export const { setEmpData } = employeeSlice.actions;
export const selectEmpData = (state) => state.employee.empdata;
export default employeeSlice.reducer;
