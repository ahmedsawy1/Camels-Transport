import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  getFAQs,
  getPrivacyPolicyPage,
  getTermsPage,
} from '../actions/pagesAction';
import {getLocations, getVans} from '../actions/requestAction';

interface IState {
  privacyData: any;
  termsData: any;
  FAQsData: any;
}

const initialState: IState = {
  privacyData: 0,
  termsData: 0,
  FAQsData: [],
};

export const pagesSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(getPrivacyPolicyPage.fulfilled, (state, action) => {
      state.privacyData = action.payload;
    });
    builder.addCase(getTermsPage.fulfilled, (state, action) => {
      state.termsData = action.payload;
    });
    builder.addCase(getFAQs.fulfilled, (state, action) => {
      state.FAQsData = action.payload;
    });
  },
});

export default pagesSlice.reducer;
