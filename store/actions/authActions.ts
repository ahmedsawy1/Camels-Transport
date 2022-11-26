import {createAsyncThunk} from '@reduxjs/toolkit';
import {t} from 'i18next';
import {showMessage} from 'react-native-flash-message';
import {axiosAPI} from '../../src/api/config';
import {AsyncKeys, saveItem} from '../../src/constants/helpers';

export const loginAction = createAsyncThunk(
  'login',
  async (params: {body: object; cb: () => void}) => {
    try {
      const {data} = await axiosAPI.post('auth/login', params.body);
      console.log('========auth/login==========');
      console.log(data);

      if (data.status == true) {
        params.cb();
      }

      return data;
    } catch (error) {
      console.log('========err .. auth/login=========');
      console.log(error);
      showMessage({type: 'danger', message: t('worngOtp')});
    }
  },
);

export const confirmOtp = createAsyncThunk(
  'confirm-otp',
  async (params: {body: object; cb: (data: object) => void}) => {
    try {
      const {data} = await axiosAPI.post('auth/confirm-otp', params.body);
      console.log('===========auth/confirm-otp=============');
      console.log(data);

      if (data.status == true) {
        params.cb(data);
        await saveItem(AsyncKeys.AUTH_TOKEN, data.token);
        // Todo
        await saveItem(AsyncKeys.USER_DATA, {name: data.name});
      }
      return data;
    } catch (error) {
      console.log('===========err .. auth/confirm-otp============');
      showMessage({type: 'danger', message: t('worngOtp')});
      console.log(error);
    }
  },
);

export const setUserName = createAsyncThunk(
  'setUserName',
  async (params: {body: object; cb: () => void}) => {
    try {
      const {data} = await axiosAPI.post('auth/update-name', params.body);
      console.log('===========auth/update-name=============');
      await saveItem(AsyncKeys.USER_DATA, {name: params.body.name});

      params.cb();
      return params.body.name;
    } catch (error) {
      console.log('===========err .. auth/update-name============');
      showMessage({type: 'danger', message: 'حدث خطأ'});
      console.log(error);
    }
  },
);
