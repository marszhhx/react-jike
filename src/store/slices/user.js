// store user-related state
import {createSlice} from '@reduxjs/toolkit'
import {_getToken, _setToken, _removeToken, request} from "@/utils";


const userStore = createSlice({
    name: "user",
    initialState: {
        token: _getToken() || '',
        userInfo: {}

    },
    reducers: {
        setToken (state, action) {
            state.token = action.payload
            // store a copy to local storage
            _setToken(action.payload)
        },
        setUserInfo(state, action){
            state.userInfo = action.payload
        },
        clearUserInfo(state) {
            state.token = ''
            state.userInfo = {}
            _removeToken()
        }
    }
})

// action creator
const { setToken, setUserInfo, clearUserInfo } = userStore.actions

// get reducer
const userReducer = userStore.reducer

const fetchLogin = (loginFormValues) => {
    return async (dispatch) => {
        const res = await request.post('/authorizations',loginFormValues)
        dispatch(setToken(res.data.token))
    }
}

const fetchUserInfo = () => {
    return async (dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}


export { setToken, fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer