import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';

// Define a type for the slice state
interface CounterState {
  oneDay: {};
  oneTime: {};
  dayFrom: any;
  dayTo: any;
  selectedDays: any[];
  onlyOneDay: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
  oneDay: 0,
  oneTime: 0,
  dayFrom: 0,
  dayTo: 0,
  selectedDays: [],
  onlyOneDay: false,
};

export const counterSlice = createSlice({
  name: 'date',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeIsOnlyDay: state => {
      state.onlyOneDay = !state.onlyOneDay;
      state.oneDay = 0;
      state.dayFrom = 0;
      state.dayTo = 0;
      state.selectedDays = [];
    },
    selectOneDay: (state, action: PayloadAction<Date>) => {
      state.oneDay = action.payload;
      state.selectedDays = [action.payload];
    },
    selectOneTime: (state, action: PayloadAction<Date>) => {
      state.oneTime = action.payload;
    },
    selectDayFrom: (state, action: PayloadAction<Date>) => {
      state.dayFrom = action.payload;
      state.selectedDays = [...state.selectedDays, action.payload];
    },
    selectDayTo: (state, action: PayloadAction<Date>) => {
      state.dayTo = action.payload;
      state.selectedDays = [...state.selectedDays, action.payload];
    },
    resetDates: state => {
      state.oneDay = 0;
      state.dayFrom = 0;
      state.dayTo = 0;
      state.oneTime = 0;
      state.selectedDays = [];
    },
  },
});

export const {
  selectOneDay,
  selectDayFrom,
  selectDayTo,
  resetDates,
  changeIsOnlyDay,
  selectOneTime,
} = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const authSlice = (state: RootState) => state.authSlice.oneDay;

export default counterSlice.reducer;
