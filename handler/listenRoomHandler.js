import { generateHash, initSocket } from "../config/config.js";
import { getState, setRoomId } from "../store/state.js";
import { messageUi } from "../ui/messages.js";
import { profileUi } from "../ui/profile.js";

(() => {
    const btnListenRoom = document.getElementById('btn-listen-room')

    const btnListenRoomHandler = () => {
        if (!getState('token')) {
            alert('Error !!! You must be sign in')
            return
        }

        var ws = initSocket();

        const roomId = document.getElementById('room-id').value
        setRoomId(roomId)

        let messagesCount  = 1
        let isSubcribeRoom = false
        
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
        }

        ws.onmessage = function (evnt) {
            let response = JSON.parse(evnt.data);

            if (response.msg === 'result' && response?.error) {
                alert(`Error !!! ${response?.error.message}`)
                return
            }

            if (response.msg === 'changed') {
                const msgRes  = response.fields.args[0]
                messageUi(msgRes, messagesCount)
                messagesCount++
            }
            if (response.msg === 'added') {
                const username  = response.fields.username
                profileUi(username)
            }

            if (response.msg == 'ping') {
                console.log('pong!');
                ws.send(JSON.stringify({
                    msg: 'pong'
                }));

                return;
            }
        };
    }

    btnListenRoom.addEventListener('click', btnListenRoomHandler)

})()