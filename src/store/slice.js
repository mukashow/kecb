import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts } from './action';

const initialState = {
  contacts: null,
};

export const main = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchContacts.fulfilled]: (state, { payload }) => {
      state.contacts = payload[0];
    },
  },
});

export default main.reducer;
