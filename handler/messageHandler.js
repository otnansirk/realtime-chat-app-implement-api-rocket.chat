import { initSocket, generateHash } from '../config/config.js'
import { getState } from '../store/state.js'
import { messageUi } from '../ui/messages.js'

(() => {
    const btnSendMessage = document.getElementById('btn-send-msg')
    
    let messagesCount  = 1
    let isSubcribeRoom = false
    

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
        const messagText = document.getElementById('message-text').value

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
            
            if (!isSubcribeRoom) {
                const subcribeRoom = {
                    "msg"  : "sub",
                    "id"   : generateHash(17),
                    "name" : "stream-room-messages",
                    "params" : [
                        roomId,
                        {
                            useCollection: false,
                            args: [{
                                visitorToken: getState('token')
                            }]
                        }
                    ]
                }
                ws.send(JSON.stringify(subcribeRoom));
                isSubcribeRoom=true
            }

            ws.send(JSON.stringify({
                "msg": "method",
                "method": "sendMessage",
                "id": generateHash(17),
                "params": [
                    {
                        "_id": generateHash(17),
                        "rid": roomId,
                        "msg": messagText,
                        "token": getState('token')
                    }
                ]
            }));

        }
     
    }

    btnSendMessage.addEventListener('click', sendMessageHandler)
})()