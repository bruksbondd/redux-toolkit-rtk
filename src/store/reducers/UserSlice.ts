import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import {fetchUsers} from "./ActionCreators";

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true
    },
    usersFetchingSuccess(state, action: PayloadAction<IUser[]>){
      state.isLoading = false
      state.error = ''
      state.users = action.payload
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    }
  },
  // extraReducers: {
  //   [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
  //       state.isLoading = false;
  //       state.error = ''
  //       state.users = action.payload;
  //   },
  //   [fetchUsers.pending.type]: (state) => {
  //       state.isLoading = true;
  //   },
  //   [fetchUsers.rejected.type]: (state,  action: PayloadAction<string>) => {
  //       state.isLoading = false;
  //       state.error = action.payload
  //   },
  // }
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled.type, (state, action: PayloadAction<IUser[]>) => {
        state.isLoading = false;
        state.error = ''
        state.users = action.payload;
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(fetchUsers.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // You can match a range of action types
      // .addMatcher(
      //   isRejectedAction,
      //   // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
      //   (state, action) => {}
      // )
      // and provide a default case if no other handlers matched
      .addDefaultCase((state, action) => {})
  },
});

export default userSlice.reducer;
