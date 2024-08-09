import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

export interface FiltersState {
  query: string;
  status: Status;
}

const initialState: FiltersState = {
  query: '',
  status: 'all',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    addQuery: (state: FiltersState, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.query = action.payload;
    },
    removeQuery: (state: FiltersState) => {
      // eslint-disable-next-line no-param-reassign
      state.query = '';
    },
    changeStatus: (state: FiltersState, action: PayloadAction<Status>) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
  },
});

export const { addQuery, removeQuery, changeStatus } = filterSlice.actions;
export default filterSlice.reducer;
