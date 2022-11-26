import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosAPI} from '../../src/api/config';

export const confirmOrder = createAsyncThunk(
  'confirmOrder',
  async (params: {body: object; cb: (data: object) => void}) => {
    try {
      const {data} = await axiosAPI.post('service/create', params.body);
      console.log('===========confirmOrder=============');
      console.log(data);

      if (data.status == true) {
        params.cb(data);
      }
      return data;
    } catch (error) {
      console.log('===========err .. confirmOrder============');
      console.log(error);
    }
  },
);

export const paymentAction = createAsyncThunk(
  'paymentAction',
  async (params: {id: number; cb: (data: object) => void}) => {
    try {
      const {data} = await axiosAPI.get(`service/pay/${params.id}`);
      console.log('===========paymentAction=============');

      params.cb(data);
      return data;
    } catch (error) {
      console.log('===========err .. paymentAction============');
      console.log(error);
    }
  },
);

export const getLocations = createAsyncThunk(
  'getLocations',
  async (params?: {cb: (data: object) => void}) => {
    try {
      const {data} = await axiosAPI.get(`services/pinned-locations`);
      // console.log('===========getLocations=============');
      // console.log(data);

      // params.cb(data);
      return data;
    } catch (error) {
      console.log('===========err .. getLocations============');
      console.log(error);
    }
  },
);

export const getVans = createAsyncThunk('getVans', async () => {
  try {
    const {data} = await axiosAPI.get(`services/types`);
    // console.log('===========getVans=============');
    // console.log(data);

    return data;
  } catch (error) {
    console.log('===========err .. getVans============');
    console.log(error);
  }
});

// export const showRequestAction = createAsyncThunk(
//   'showRequest',
//   async (params: {id: number; cb: (data: object) => void}) => {
//     try {
//       const {data} = await axiosAPI.get(`service/show/71`);
//       console.log('===========showRequest=============');
//       console.log(data);

//       if (data.status == true) {
//         params.cb(data);
//       }
//       return data;
//     } catch (error) {
//       console.log('===========err .. showRequest============');
//       console.log(error);
//     }
//   },
// );
