// store user-related

import {createSlice} from '@reduxjs/toolkit'
import {http} from "@/utils";

const userStore = createSlice({
    name: "user",
    initialState: {
        token: ''
    },
    reducers: {
        setToken (state, action) {
            state.token = action.payload
        }
    }
})

// action creator
const { setToken } = userStore.actions

// get reducer
const userReducer = userStore.reducer

const fetchLogin = (loginFormValues) => {
    return async (dispatch) => {
        const res = await http.post('/authorizations',loginFormValues)
        dispatch(setToken(res.data.token))
    }
}


export {setToken, fetchLogin}

export default userReducer