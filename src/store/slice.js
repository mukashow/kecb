import { createSlice } from '@reduxjs/toolkit';
import { fetchBanners, fetchContacts } from './action';

const initialState = {
  contacts: null,
  banners: [],
};

export const main = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchContacts.fulfilled]: (state, { payload }) => {
      state.contacts = payload[0];
    },
    [fetchBanners.fulfilled]: (state, { payload }) => {
      state.banners = payload;
    },
  },
});

export default main.reducer;
