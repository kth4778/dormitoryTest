import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL; // 백엔드 API 기본 URL

// 회원가입 비동기 액션
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL + 'signup', userData, {
        withCredentials: true, // ✅ 이거 안 넣으면 CORS 실패
      });
      return response.data;
    } catch (error) {
      // More robust error handling
      if (error.response && error.response.data) {
        // If backend sends a specific error message in data.message or data.error
        return rejectWithValue(error.response.data.message || error.response.data.error || '알 수 없는 오류가 발생했습니다.');
      } else if (error.message) {
        // If it's a network error or other Axios error
        return rejectWithValue(error.message);
      }
      return rejectWithValue('네트워크 오류가 발생했습니다.');
    }
  }
);

// 로그인 비동기 액션
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL + 'login', userData, {
        withCredentials: true, // ✅ 꼭 필요!
      });
      // 로그인 성공 시 토큰과 사용자 정보를 로컬 스토리지에 저장
      localStorage.setItem('user', JSON.stringify(response.data.userInfo));
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      // More robust error handling
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || error.response.data.error || '알 수 없는 오류가 발생했습니다.');
      } else if (error.message) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('네트워크 오류가 발생했습니다.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null, // This will now directly hold the error message string
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 회원가입
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message; // Assuming fulfilled payload always has .message
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // action.payload is now the error message string
      })
      // 로그인
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.userInfo;
        state.token = action.payload.token;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // action.payload is now the error message string
      });
  },
});

export const { logout, clearMessage, clearError } = authSlice.actions;
export default authSlice.reducer;