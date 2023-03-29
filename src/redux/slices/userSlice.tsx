import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { httpRequest } from '../../services/helper/axios'
import { InitialStateType } from '../../services/types/InitialStateType';
import { UserType } from '../../services/types/UserType';

import type { AxiosError } from 'axios'

interface ValidationErrors {
    errorMessage: string
    field_errors: Record<string, string>
}

const initialState: InitialStateType = {
    isLoading: false,
    messages: {
        type: "",
        message: ""
    },
    errors: null,
    user: {
        id: "",
        firstName: "",
        lastName: "",
        gender: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        school: "",
        isGraduate: false,
        email: "",
        favourites: [],
    },
    users: []
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setMessage(state, action) {
            state.messages = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.users = action.payload.items;
                state.isLoading = false;
            })
            .addCase(createUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.users.push(action.payload)
                state.isLoading = false;
                state.messages = { type: "success", message: "Create new user success !" }
            })
            .addCase(createUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((value) => value.id != action.payload.id)
                state.isLoading = false;
                state.messages = { type: "success", message: "Delete user success !" }
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const userIndex = state.users.findIndex(user => user.id === action.payload.id)
                state.users[userIndex] = action.payload;
                state.user = action.payload;
                state.isLoading = false;
                state.messages = { type: "success", message: "Update user success !" }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload;
            })
    }
})

const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async () => {
        const res = await httpRequest.get('/users')
        return res.data;
    }
)
const getUserById = createAsyncThunk(
    'user/getUserById',
    async (userId: string | undefined) => {
        const res = await httpRequest.get(`users/${userId}`)
        return res.data
    }
)
const createUser = createAsyncThunk(
    'users/createUser',
    async (user: UserType, { rejectWithValue }) => {
        try {
            const res = await httpRequest.post('/users', user)
            return res.data
        } catch (error: AxiosError<ValidationErrors> | any) {
            return rejectWithValue(error.response.data)
        }
    }
)
const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ userId, data }: { userId: string | undefined, data: UserType }, { rejectWithValue }) => {
        try {
            const res = await httpRequest.put(`users/${userId}`, data)
            return res.data
        } catch (error: AxiosError<ValidationErrors> | any) {
            return rejectWithValue(error.response.data)
        }
    }
)
const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (userId: string, { rejectWithValue }) => {
        try {
            const res = await httpRequest.delete(`/users/${userId}`)
            return res.data
        } catch (error: AxiosError<ValidationErrors> | any) {
            return rejectWithValue(error.response.data)
        }
    }
)
export { userSlice, fetchUser, createUser, deleteUser, getUserById, updateUser };