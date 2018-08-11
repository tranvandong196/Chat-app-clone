const useLocal = true;
module.exports = {
    'jwtSecret': 'dongtranv',
    'dbUri': useLocal ? 'mongodb://localhost:27017/chat-room':'mongodb://dongtranv:1password@ds215172.mlab.com:15172/chat-room'
};