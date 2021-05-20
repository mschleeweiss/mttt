import io from 'socket.io-client';

const initParams = {
    name: localStorage.name ?? "Player Unknown",
    id: sessionStorage.socketId ?? ""
}

const encodedParams = Object.keys(initParams)
    .map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(initParams[key])}`;
    })
    .join("&");

export const socket = io("http://localhost:3000", { query: encodedParams })