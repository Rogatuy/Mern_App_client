import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  isLoading: false,
  users: [],
};

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers', async () => {
  try {
    const {data} = await axios.get('mernappserver-production.up.railway.app/api/users');
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removeUser = createAsyncThunk(
  'users/delete',
  async (_id) => { 
    try{
      const {data} = await axios.delete('mernappserver-production.up.railway.app/api/users/delete', {
        data:{_id}
      });

      return data;
    } catch(error) {
      console.log(error);
    }
})

export const blockedUser = createAsyncThunk(
  'users/blocked',
  async ({_id}) => { 
    try{
      const {data} = await axios.post('mernappserver-production.up.railway.app/api/users/blocked', {
        _id,
      });

      return data;
    } catch(error) {
      console.log(error);
    }
})

export const unblockedUser = createAsyncThunk(
  'users/unblocked',
  async ({_id}) => { 
    try{
      const {data} = await axios.post('mernappserver-production.up.railway.app/api/users/unblocked', {
        _id,
      });

      return data;
    } catch(error) {
      console.log(error);
    }
})

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    //All users
    [getAllUsers.pending]: (state) => {
      state.isLoading = true
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.isLoading = false
      state.users = action.payload?.allUsers;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.isLoading = false
    },
    //Delete user
    [removeUser.pending]: (state) => {
      state.isLoading = true
    },
    [removeUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.users = action.payload?.allUsers;
    },
    [removeUser.rejected]: (state) => {
      state.isLoading = false
    },
    //Blocked user
    [blockedUser.pending]: (state) => {
      state.isLoading = true
    },
    [blockedUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.users = action.payload?.allUsers;
    },
    [blockedUser.rejected]: (state) => {
      state.isLoading = false
    },
    //Unblocked user
    [unblockedUser.pending]: (state) => {
      state.isLoading = true
    },
    [unblockedUser.fulfilled]: (state, action) => {
      state.isLoading = false
      state.users = action.payload?.allUsers;
    },
    [unblockedUser.rejected]: (state) => {
      state.isLoading = false
    },
  }
})

export default usersSlice.reducer;