import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

export const fetchContacts = createAsyncThunk('main/fetchContacts', async () => {
  return (await api('contacts/')).data;
});
