import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {confirmOtp, setUserName} from '../actions/authActions';

import {RootState} from '../store';

interface IState {
  isSignIn: boolean;
  userName: string;
}

const initialState: IState = {
  isSignIn: false,
  userName: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // emptyUsers: state => {
    //   state.test = 0;
    // },

    switchSignIn: (state, action: PayloadAction<boolean>) => {
      state.isSignIn = action.payload;
    },
  },

  extraReducers: builder => {
    builder.addCase(setUserName.fulfilled, (state, action) => {
      state.userName = action.payload;
    });
    // builder.addCase(deleteUser.pending, (state, action) => {
    //   alert('Load');
    // });
    // builder.addCase(updateUser.rejected, () => alert('error'));
  },
});

export const {switchSignIn} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.test;

export default authSlice.reducer;
