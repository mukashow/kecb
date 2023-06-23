import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

export const fetchContacts = createAsyncThunk('main/fetchContacts', async () => {
  return (await api('contacts/')).data;
});

export const fetchBanners = createAsyncThunk('main/fetchBanners', async () => {
  return (await api('main_banner/')).data;
});
