class Socket {
    constructor(io) {
        this.io = io;
        this.connections = [];
        this.namespaces = [];
    }

    /**
     *
     * @param string namespace
     */
    createNamespace(namespace) {
        this.namespaces.push(this.io.of(namespace))
    }

    connectDefault(io) {
        if (!this.io && io) this.io = io;
        this.io.on('connect', (socket) => {
            console.log('New client connect to namespace(/) %s', socket.id);

            socket.on('onDisconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    connect() {
        this.namespaces.forEach((namespace) => {
            namespace.on('connect', (socket) => {
                console.log('New client connect to namespace(%s)', namespace.name);
                this.onOnlineUser(namespace);
                this.onNewMember(namespace, socket);
                this.onMessage(namespace, socket);
                this.onDisconnect(namespace, socket);
            });
        })
    }

    onOnlineUser(namespace) {
        if (this.connections.length > 0) {
            const onlineUsers = this.connections.map(socket => socket.user);
            namespace.emit('online-users', onlineUsers);
        }
    }

    onMessage(namespace, socket) {
        socket.on('message', (m) => {
            if (!socket.user) {
                socket.user = m.from;
                this.connections.push(socket);
                console.log('Username: ', socket.user.name);
            }
            console.log('[server](message): %s', JSON.stringify(m));
            namespace.emit('message', m);
        });
    }

    onNewMember(namespace, socket) {
        socket.on('new-member', user => {
            namespace.emit('new-member', user);
            console.log('new-member: ', user);
        });
    }

    onDisconnect(namespace, socket) {
        socket.on('onDisconnect', () => {
            console.log('Client disconnected: %s', socket.user.name);
            namespace.emit('onDisconnect', socket.user);
            this.connections.splice(this.connections.indexOf(socket), 1);
        });
    }

}

module.exports = new Socket();