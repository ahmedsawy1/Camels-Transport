import {createAsyncThunk} from '@reduxjs/toolkit';
import {t} from 'i18next';
import {showMessage} from 'react-native-flash-message';
import {axiosAPI} from '../../src/api/config';
import {AsyncKeys, saveItem} from '../../src/constants/helpers';

export const getServices = createAsyncThunk(
  'services',
  async (cb?: () => void) => {
    try {
      const {data} = await axiosAPI.get('services');
      console.log(data.data);

      //   if (data.status == true) {
      //     params.cb();
      //   }

      return data;
    } catch (error) {
      console.log('========err .. getServices=========');
      console.log(error);
      //   showMessage({type: 'danger', message: t('worngOtp')});
    }
  },
);

export const showService = createAsyncThunk(
  'showService',
  async (params: {id: number; cb?: (res: string, data: any) => void}) => {
    try {
      const {data} = await axiosAPI.get(`service/show/${params.id}`);

      // console.log('====================================');
      // console.log(JSON.stringify(data, null, 3));
      // console.log('====================================');
      params.cb && params.cb('succ', data);

      return data;
    } catch (error) {
      console.log('========err .. showService=========');
      console.log(error);
    }
  },
);
