import { createSlice } from '@reduxjs/toolkit';

const recordingsSlice = createSlice({
  name: 'recordings',
  initialState: {
    recordings: [], // Initialize recordings as an empty array
    loading: false,
    error: null,
  },
  reducers: {
    fetchRecordingsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRecordingsSuccess(state, action) {
      state.recordings = action.payload;
      state.loading = false;
    },
    fetchRecordingsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRecordingsStart,
  fetchRecordingsSuccess,
  fetchRecordingsFailure,
} = recordingsSlice.actions;

export default recordingsSlice.reducer;
