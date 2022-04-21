# REALTIME CHAT WITH API ROCKET CHAT

Fork this project and clone to your local machine

## Ui from this project
![Screenshot from 2022-04-21 12-40-49](https://user-images.githubusercontent.com/30102523/164383861-559eb2e5-b753-47fc-8112-8eb05ed0deee.png)

## From rocket chat
![Screenshot from 2022-04-21 12-40-30](https://user-images.githubusercontent.com/30102523/164384049-1b5a2f48-c953-486d-979e-3c473bf77133.png)



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
