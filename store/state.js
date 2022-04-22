let state = {
    token: '',
    roomId: '',
    user: {}
}

export const setToken = (token) => {
    state = {...state, token: token}
    return token
}

export const setRoomId = (roomId) => {
    state = {...state, roomId: roomId}
    return roomId
}

export const setUser = (user) => {
    state = {...state, user: user}
    return user
}

export const getState = (key) => {
    if (key) {
        return state[key]
    }
    return state
}