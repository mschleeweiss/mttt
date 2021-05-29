import io from 'socket.io-client';

const initParams = {
    name: localStorage.name ?? "Player Unknown",
    id: sessionStorage.socketId ?? ""
}

const query = Object.keys(initParams)
    .map(key => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(initParams[key])}`;
    })
    .join("&");

const isDev = process.env.NODE_ENV === "development";
export const socket = isDev ? io("http://localhost:3000", { query }) : io({ query });