import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  _id: null,
  email: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({name, email, password}) => { 
    try{
      const {data} = await axios.post('/auth/register', {
        name,
        email,
        password,
      });

      if(data.token && data.newUser._id) {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('_id', data.newUser._id);
      }

      return data;
    } catch(error) {
      console.log(error);
    }

})

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({email, password}) => { 
    try{
      const {data} = await axios.post('/auth/login', {
        email,
        password,
      });


      if(data.token && data.user._id) {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('_id', data.user._id);
      }

      return data;
    } catch(error) {
      console.log(error);
    }
})

export const getMe = createAsyncThunk(
  'auth/getMe',
  async () => { 
    try{
      const {data} = await axios.get('/auth/me');

      if(data.token) {
        window.localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch(error) {
      console.log(error);
    }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      state._id = null;
      state.email = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
    }
  },
  extraReducers: {
    //Register user
    [registerUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state._id = action.payload?.newUser._id;
      state.email = action.payload?.newUser.email;
      state.token = action.payload?.token;
      state.isLoading = false;
      state.status = action.payload.message;    
    },
    [registerUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false;
    },
    //Login user
    [loginUser.pending]: (state) => {
      state.isLoading = true;
      state.status = null;
    },
    [loginUser.fulfilled]: (state, action) => {
      state._id = action.payload?.user._id;
      state.email = action.payload?.user.email;
      state.token = action.payload?.token;
      state.isLoading = false;
      state.status = action.payload.message;  
    },
    [loginUser.rejected]: (state, action) => {
      state.status = action.payload.message;
      state.isLoading = false
    },
    //Проверка авторизации
    [getMe.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [getMe.fulfilled]: (state, action) => {
      state._id = action.payload?._id;
      state.email = action.payload?.email;
      state.token = action.payload?.token;
      state.isLoading = false
      state.status = null;
    },
    [getMe.rejected]: (state, action) => {
      state.status = action.payload.message;
      state._id = '';
      state.email = '';
      state.token = '';
      state.isLoading = false
    },
  }
})

export const checkIsAuth = (state) => Boolean(state.auth.token);
export const { logOut } = authSlice.actions;

export default authSlice.reducer;
