import { configureStore } from "@reduxjs/toolkit";
import {useDispatch} from 'react-redux'
import {userSlice} from "./slices/userSlice";

const store = configureStore({
    reducer:{
        users : userSlice.reducer
    }
})

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export default store;