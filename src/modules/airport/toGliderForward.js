export default function toGliderForward(node) {
    const { protocol, password, encrypt, host, port, params } = node || {};
    const { peer } = params || {};
    if (host) {
        switch (protocol) {
            case 'trojan':
                return `trojan://${password}@${host}:${port}?serverName=${peer}`;
            case 'ss':
                return `ss://${encrypt}:${password}@${host}:${port}`;
        }
    }
    return '';
}
