import { configureStore } from '@reduxjs/toolkit';
import main from './slice';

export const store = configureStore({
  reducer: {
    main,
  },
});
