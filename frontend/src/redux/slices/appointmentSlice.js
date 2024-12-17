import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create Appointment
export const createAppointment = createAsyncThunk('appointments/create', async (appointmentData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.post('/api/appointments', appointmentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

// Fetch Available Appointments
export const fetchAppointments = createAsyncThunk('appointments/fetch', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.get('/api/appointments', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

// Claim Appointment
export const claimAppointment = createAsyncThunk('appointments/claim', async (appointmentId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const response = await axios.put(`/api/appointments/${appointmentId}/claim`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
});

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [createAppointment.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      state.appointments.push(action.payload);
    },
    [createAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [fetchAppointments.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchAppointments.fulfilled]: (state, action) => {
      state.loading = false;
      state.appointments = action.payload;
    },
    [fetchAppointments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [claimAppointment.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [claimAppointment.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.appointments.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    },
    [claimAppointment.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default appointmentSlice.reducer;
