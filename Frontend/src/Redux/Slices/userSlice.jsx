import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/user";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async ({ formData, otp }, { rejectWithValue }) => {
    try {
      // First verify OTP
      const verifyResponse = await axios.post(`${API_BASE_URL}/verify-otp`, {
        email: formData.email,
        otp: otp
      });
      
      if (verifyResponse.data.message === "OTP verified successfully") {
        // Proceed with registration
        const registerResponse = await axios.post(`${API_BASE_URL}/signup`, {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        });
        
        return registerResponse.data;
      }
      return rejectWithValue(verifyResponse.data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for sending OTP
export const sendOTP = createAsyncThunk(
  'user/sendOTP',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/send-otp`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDatas: (() => {
      try {
        const storedData = localStorage.getItem('userDatas');
        return storedData ? JSON.parse(storedData) : null;
      } catch (error) {
        console.warn('Error parsing userDatas from localStorage:', error);
        localStorage.removeItem('userDatas');
        return null;
      }
    })(),
    loading: false,
    error: null,
    otpSent: false,
    registrationSuccess: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.userDatas = action.payload;
      localStorage.setItem('userDatas', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.userDatas = null;
      localStorage.removeItem('userDatas');
    },
    updateUser: (state, action) => {
      if (state.userDatas) {
        state.userDatas = { ...state.userDatas, ...action.payload };
        localStorage.setItem('userDatas', JSON.stringify(state.userDatas));
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    resetRegistrationSuccess: (state) => {
      state.registrationSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Send OTP cases
    builder
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpSent = false;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to send OTP';
        state.otpSent = false;
      })

    // Register cases
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registrationSuccess = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registrationSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
        state.registrationSuccess = false;
      })

    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDatas = action.payload;
        localStorage.setItem('userDatas', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      });
  },
});

export const { 
  addUser, 
  logoutUser, 
  updateUser, 
  clearError, 
  resetRegistrationSuccess 
} = userSlice.actions;

export default userSlice.reducer;