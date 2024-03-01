// encapsulate token-related methods, set, get, remove

const TOKEN_KEY = 'token_key'

const _setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

const _getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

const _removeToken = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export {
    _setToken,
    _getToken,
    _removeToken
}