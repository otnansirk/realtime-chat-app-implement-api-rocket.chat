import { initSocket, generateHash } from '../config/config.js'
import { getState } from '../store/state.js'

(() => {
    const btnSendMessage = document.getElementById('btn-send-msg')
    
    function sendMessageHandler(){
        if (!getState('token')) {
            alert('Error !!! You must be sign in')
            return
        }
        if (!getState('roomId')) {
            alert('Error !!! You must be enter room first')
            return
        }

        var ws = initSocket();
        const roomId     = getState('roomId')
        const messagText = document.getElementById('message-text')

        ws.onopen = function() {

            ws.send(JSON.stringify({
                "msg"     : "connect",
                "version" : "1",
                "support" : ["1"]
            }));

            var loginRequest = {
                "msg": "method",
                "method": "login",
                "id": generateHash(17),
                "params": [
                    { 
                        "resume": getState('token') 
                    }
                ]
            }
            ws.send(JSON.stringify(loginRequest));  
            
            onTyping(false)
            ws.send(JSON.stringify({
                "msg": "method",
                "method": "sendMessage",
                "id": generateHash(17),
                "params": [
                    {
                        "_id": generateHash(17),
                        "rid": roomId,
                        "msg": messagText.value,
                        "token": getState('token')
                    }
                ]
            }));
            messagText.value = ''

        }
     
    }

    const onTyping = (isTyping = true) => {
        const roomId     = getState('roomId')
        var ws = initSocket();
        ws.onopen = function() {

            ws.send(JSON.stringify({
                "msg"     : "connect",
                "version" : "1",
                "support" : ["1"]
            }));

            var loginRequest = {
                "msg": "method",
                "method": "login",
                "id": generateHash(17),
                "params": [
                    { 
                        "resume": getState('token') 
                    }
                ]
            }
            ws.send(JSON.stringify(loginRequest));  

            ws.send(JSON.stringify({
                "msg": "method",
                "method": "stream-notify-room",
                "id": generateHash(17),
                "params": [
                    `${roomId}/typing`,
                    getState('user').username,
                    isTyping
                ]
            }));
        }
    }
    
    let typingTimer;
    let noLongerTypingTime = 2000;
    const onKeyUp = (e) => {
        clearTimeout(typingTimer)
        typingTimer = setTimeout(() => onTyping(false), noLongerTypingTime )
    }

    const messagText = document.getElementById('message-text')
    btnSendMessage.addEventListener('click', sendMessageHandler)
    messagText.addEventListener('keyup', onKeyUp, false)
    messagText.addEventListener('keydown', () => onTyping(true), false)
})()