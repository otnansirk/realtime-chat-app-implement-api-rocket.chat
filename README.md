# REALTIME CHAT WITH API ROCKET CHAT

## Config
Update editable config in file `config/config.example.js` and rename to `config/config.js`

Update with your config like :
```
baseApiUrl    = "http://localhost:3000/api/v1"
baseSocketUrl = "ws://localhost:3000/websocket"
```


## Usage

### Required step
1. [ TOKEN AUTH ] Get token auth from login API `chat.com/api/login`
2. [ ROOM ID ]    Get room id from your room list `chat.com/api/rooms.get`

### Login
Login with your token you got from step 1

### Enter room
Enter room with your room id you got from step 2

### Send message
Send message with free text


## Run
Run with live server in vsCode or just run index.html

`Recomended with live server in vsCode`

## [Official Docs Rocket.chat](https://developer.rocket.chat/reference/api/realtime-api)
