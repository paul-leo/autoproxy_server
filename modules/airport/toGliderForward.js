export default function toGliderForward(node) {
    const { protocol, password, encrypt, host, port, params } = node || {};
    if (host) {
        switch (protocol) {
            case 'trojan':
                return `trojan://${password}@${host}:${port}`;
            case 'ss':
                return `ss://${encrypt}:${password}@${host}:${port}`;
        }
    }
    return '';
}
