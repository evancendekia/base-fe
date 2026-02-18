import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { be_api } from "../api/api";
import config from "../config";

const LOCAL_STORAGE_KEY = "authorization_token";
const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY);

const initialState = {

  user: null,
  token: storedToken || null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      return await be_api.auth.login(credentials);

    //   const res = await be_api.auth.login(data);


// navigate("/user");
    } catch (err) {
      return rejectWithValue("Login failed");
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await be_api.auth.register(userData);
      return response;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Signup failed");
    }
  },
);

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      return await be_api.user.getProfile();
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem(LOCAL_STORAGE_KEY, action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem(LOCAL_STORAGE_KEY, action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ME
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
      });

  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
