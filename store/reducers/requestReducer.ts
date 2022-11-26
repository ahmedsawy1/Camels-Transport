import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getLocations, getVans} from '../actions/requestAction';
import {getServices} from '../actions/servicesActions';
import {RootState} from '../store';

interface IState {
  pickUpLat: number;
  pickUpLong: number;
  dropOffLat: number;
  dropOffLong: number;
  suggestLocation: [];
  vans: [];
}

const initialState: IState = {
  pickUpLat: 0,
  pickUpLong: 0,
  dropOffLat: 0,
  dropOffLong: 0,
  suggestLocation: [],
  vans: [],
};

interface iLocation {
  lat: number;
  long: number;
}

export const requestSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setPickUpLocation: (state, action: PayloadAction<iLocation>) => {
      state.pickUpLat = action.payload.lat;
      state.pickUpLong = action.payload.long;
    },
    setDropOffLocation: (state, action: PayloadAction<iLocation>) => {
      state.dropOffLat = action.payload.lat;
      state.dropOffLong = action.payload.long;
    },
  },

  extraReducers: builder => {
    builder.addCase(getLocations.fulfilled, (state, action) => {
      state.suggestLocation = action.payload;
    });
    builder.addCase(getVans.fulfilled, (state, action) => {
      state.vans = action.payload;
    });
  },
});

export const {setPickUpLocation, setDropOffLocation} = requestSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const services = (state: RootState) => state.services;

export default requestSlice.reducer;
