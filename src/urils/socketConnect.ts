import { io, Socket } from 'socket.io-client';
import { socketUrl } from './baseUrl';

let socket: Socket | null = null;

export const connectSocket = (userId: string): Socket => {
  if (socket && socket.connected) {
    return socket;
  }

  socket = io(socketUrl, {
    auth: { userId },
    transports: ['websocket'], // ✅ helps prevent polling fallback
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket?.id);
  });

  socket.on('disconnect', (reason) => {
    console.warn('⚠️ Socket disconnected:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('❌ Socket connection error:', error.message);
  });

  return socket;
};

export const getSocket = (): Socket | null => socket;
