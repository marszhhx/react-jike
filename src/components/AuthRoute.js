// Encapsulate HOC

import {_getToken} from "@/utils";
import {Navigate} from "react-router-dom";

const AuthRoute = ({children}) => {
    const token = _getToken()
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to={'/login'} replace/>
    }
}

export default AuthRoute