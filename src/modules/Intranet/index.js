export default class Intranet {
    bridges = [];
    clients = [];
    servers = [];
    constructor(io) {
        // 清空当前的客户端
        if (!io) return null;
        this.io = io;
        this.io.on('connection', (socket) => {
            //bridge 上线
            socket.on('bridge-online', (bridgeInfo) => {
                console.log('bridge-online', bridgeInfo);
                const bridgeId = socket.id;
                const bridge = {
                    ...bridgeInfo,
                    socket: socket,
                    id: bridgeId,
                };
                /**
                 * 客户端上线了
                 */
                socket.on('client-change', ({ action, client }) => {
                    console.log('client-change', action, client);
                    switch (action) {
                        case 'connected':
                            const hasClient = this.clients.find((item) => {
                                return item.client === client;
                            });
                            if (!hasClient) {
                                this.clients.push({
                                    bridge,
                                    client,
                                });
                            }
                            break;
                        case 'released':
                            this.clients = this.clients.filter((item) => {
                                item.client !== client;
                            });
                    }
                    this.sendToServer();
                });
                this.bridges.push(bridgeInfo);
                socket.on('disconnect', () => {
                    // bridge 掉线和它相关的client和bridge也掉线
                    this.bridges = this.bridges.filter((item) => {
                        return item.id !== bridgeId;
                    });
                    this.clients = this.clients.filter((item) => {
                        return item.bridge.id !== bridgeId;
                    });
                    this.sendToServer();
                });
            });

            socket.on('server-online', (server) => {
                this.servers.push({ server, socket });
                socket.emit('client-change', this.getAllClient());
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
        return this.clients.map(({ client, bridge }) => {
            const { socket, ...bridgeInfo } = bridge;
            if (bridgeInfo && client) {
                return { client: client, bridge: bridgeInfo };
            }
        });
    }
    sendToServer() {
        this.servers.forEach(({ server, socket }) => {
            socket?.emit('client-change', this.getAllClient());
        });
    }
}
