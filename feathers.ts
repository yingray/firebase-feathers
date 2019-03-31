import * as io from 'socket.io-client';
import * as feathers from '@feathersjs/client';

const socket = io('http://localhost:3030');
export const client = feathers();

client.configure(feathers.socketio(socket));
// client.configure(feathers.authentication({
//   storage: window.localStorage
// }));