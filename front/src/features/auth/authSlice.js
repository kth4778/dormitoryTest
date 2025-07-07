import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL?.replace(/\/+$/, ''); // 끝에 슬래시 제거

// ✅ Axios 인스턴스 생성 (withCredentials 기본 포함)
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// ✅ 로컬스토리지 키 상수화
const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
};

// 회원가입
export const signup = createAsyncThunk(
    'auth/signup',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await api.post('/api/signup', userData);
        return response.data;
      } catch (error) {
        const errMsg =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            '네트워크 오류가 발생했습니다.';
        return rejectWithValue(errMsg);
      }
    }
);

// 로그인
export const login = createAsyncThunk(
    'auth/login',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await api.post('/api/login', userData);

        // 사용자 정보 로컬스토리지 저장
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.userInfo));
        localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.token);

        return response.data;
      } catch (error) {
        const errMsg =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            '네트워크 오류가 발생했습니다.';
        return rejectWithValue(errMsg);
      }
    }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || null,
    token: localStorage.getItem(STORAGE_KEYS.TOKEN) || null,
    isLoading: false,
    error: null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
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
          state.message = action.payload.message;
        })
        .addCase(signup.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
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
          state.error = action.payload;
        });
  },
});

export const { logout, clearMessage, clearError } = authSlice.actions;
export default authSlice.reducer;
