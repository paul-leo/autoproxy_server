import { io } from 'socket.io-client';
const socket = io('ws://focusbe.com:8801', {
    reconnectionDelayMax: 10000,
});
socket.on('connect', () => {
    // socket.emit('bridge-online', {
    //     port: 8445,
    //     ip: 'localhost',
    // });
    // socket.emit('client-change', {
    //     action: 'connected',
    //     client: '111111',
    // });
    // setTimeout(() => {
    //     socket.emit('client-change', {
    //         action: 'disconnected',
    //         client: '111111',
    //     });
    // }, 1000);
    socket.emit('server-online', {
        action: 'disconnected',
        client: '111111',
    });
    socket.on('client-change', (clients) => {
        console.log('clients', clients);
    });
});
