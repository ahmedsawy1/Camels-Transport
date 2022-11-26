import {createAsyncThunk} from '@reduxjs/toolkit';
import {axiosAPI} from '../../src/api/config';

export const getPrivacyPolicyPage = createAsyncThunk(
  'privacy-policy',
  async (params?: {cb: (data: object) => void}) => {
    try {
      const {data} = await axiosAPI.get(`helper/privacy-policy`);
      console.log('===========privacy-policy=============');
      console.log(data);

      // params.cb(data);
      return data;
    } catch (error) {
      console.log('===========err .. privacy-policy============');
      console.log(error);
    }
  },
);

export const getTermsPage = createAsyncThunk(
  'terms',
  async (params?: {cb: (data: object) => void}) => {
    try {
      const {data} = await axiosAPI.get(`helper/terms-and-conditions`);
      console.log('===========terms=============');
      console.log(data);

      // params.cb(data);
      return data;
    } catch (error) {
      console.log('===========err .. terms============');
      console.log(error);
    }
  },
);

export const getFAQs = createAsyncThunk(
  'getFAQs',
  async (params?: {cb: (data: object) => void}) => {
    try {
      const {data} = await axiosAPI.get(`helper/faqs`);
      console.log('===========faqs=============');
      console.log(data);

      // params.cb(data);
      return data;
    } catch (error) {
      console.log('===========err .. faqs============');
      console.log(error);
    }
  },
);
