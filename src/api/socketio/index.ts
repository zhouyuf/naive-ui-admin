import { io } from 'socket.io-client';
export const socket = io('127.0.0.1:3333');
export function sendMessage(params: any) {
  const { message } = params;
  socket.emit('message', message);
}