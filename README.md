# How to setup local development

## Install dependencies

Install the dependencies of the backend and the frontend
```bash
npm install
cd client
npm install
```

## Start application

Start the backend (localhost:3000)
```bash
cd .. (if you are still in the client folder)
npm run start:dev
```
(the backend also serves the frontend (`/client/dist`) but this will only work properly if the app runs in production

Start the frontend (localhost:8080)
```bash
cd client
npm run serve
```

## ToDo

Frontend
- [ ] component for styled button with different types/colors
- [ ] component for Lobby (visible if game.lobby = true)
- [ ] copy shareable link button
- [ ] players can choose between X and O in lobby
- [ ] players can change name (store name in localStorage for future games)
- [ ] once everyone is in a team show button to start the game
- [ ] component for Board (visible if game.lobby = false)

Backend
- [ ] socket.io rooms (right now everyone receives every message)
- [ ] socket event to start a game (lobby = false, every client in room receives message)
- [ ] socket event to make a move
- [ ] validation of moves in the backend
