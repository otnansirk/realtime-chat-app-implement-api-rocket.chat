export const baseApiUrl    = "http://localhost:3000/api/v1"  // editable
export const baseSocketUrl = "ws://localhost:3000/websocket" // editable

export const initSocket = () => {
    return new WebSocket(baseSocketUrl);
}

export const generateHash = (targetLength) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < targetLength; i++)
       text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}