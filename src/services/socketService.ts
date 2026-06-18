import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (userId?: string) => {
  if (!socket) {
    socket = io(window.location.origin, {
      autoConnect: true,
    });
  }
  if (userId) {
    socket.emit('join', userId);
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
