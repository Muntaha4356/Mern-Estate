import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    token: null,
}


const userSlice = createSlice({
    name: 'user',
    initialState, 
    reducers:{
        signInStart: (state)=>{
            state.loading = true; 
        },
        signInSuccess: (state, action) => {
            state.currentUser =action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            state.error =null;
        },
        signInFailure: (state, action) =>{
            state.error= action.payload;
            state.loading = false;
        }

    }

})


export const {signInStart, signInSuccess ,signInFailure } = userSlice.actions;

export default userSlice.reducer;