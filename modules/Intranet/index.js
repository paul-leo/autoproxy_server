export default class Intranet {
    clients = [];
    servers = [];
    constructor(io) {
        if (!io) return null;
        this.io = io;
        this.io.on('connection', (socket) => {
            /**
             * 客户端上线了
             */
            socket.on('client-online', (msg) => {
                this.clients.push(socket);
                socket.clientInfo = msg;
                this.sendToServer();
                socket.on('disconnect', () => {
                    // 客户端下线
                    const index = this.clients.findIndex((item) => {
                        return item === socket;
                    });
                    this.clients.splice(index, 1);
                    this.sendToServer();
                });
            });

            socket.on('server-online', (msg) => {
                this.clients.push(socket);
                socket.serverInfo = msg;
                socket.emit(this.getAllClient());
                socket.on('disconnect', () => {
                    // 客户端下线
                    const index = this.servers.findIndex((item) => {
                        return item === socket;
                    });
                    this.servers.splice(index, 1);
                });
            });
        });
    }
    getAllClient() {
        return this.clients.map((item) => {
            return item.clientInfo;
        });
    }
    sendToServer() {
        console.log(this.getAllClient());
        this.servers.forEach((server) => {
            server.emit(this.getAllClient());
        });
    }
}
