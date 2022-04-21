let state = {
    token: '',
    roomId: ''
}

export const setToken = (token) => {
    state = {...state, token: token}
    return token
}

export const setRoomId = (roomId) => {
    state = {...state, roomId: roomId}
    return roomId
}

export const getState = (key) => {
    if (key) {
        return state[key]
    }
    return state
}