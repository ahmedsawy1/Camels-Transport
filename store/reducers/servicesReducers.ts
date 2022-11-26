import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getServices, showService} from '../actions/servicesActions';
import {RootState} from '../store';

interface IState {
  services: [];
  singleServiceData: {};
}

const initialState: IState = {
  services: [],
  singleServiceData: {},
};

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getServices.fulfilled, (state, action) => {
      state.services = action.payload.data;
    });

    // builder.addCase(deleteUser.pending, (state, action) => {
    //   alert('Load');
    // });
    // builder.addCase(deleteUser.rejected, (state, action) => {
    //   alert('error');
    // });

    builder.addCase(showService.fulfilled, (state, action) => {
      state.singleServiceData = action.payload;
    });
  },
});

export const {} = servicesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const services = (state: RootState) => state.services;

export default servicesSlice.reducer;
