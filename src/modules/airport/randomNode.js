import getAllNode from './getAllNode.js';
import { tcpPingPort } from 'tcp-ping-port';
let avaliUrl = [];
const cnKeyWords = ['hk', '香港', '新加坡', '台湾', '澳门', 'jp', 'sg', 'tw'];
function hasCnKeyword(label) {
    return cnKeyWords.some((keyword) => {
        return label.indexOf(keyword) > -1;
    });
}

async function testNode(node) {
    const { host, port } = node;
    const options = {
        socketTimeout: 3000,
        dnsTimeout: 3000,
    };

    const res = await tcpPingPort(host, Number(port), options);
    if (res.online) {
        return node;
    } else {
        throw new Error('timeout');
    }
}

async function randomANode() {
    if (avaliUrl.length > 5) {
        try {
            let res = await raceANode(avaliUrl);
            if (res) {
                return res;
            } else {
                avaliUrl = [];
            }
        } catch (error) {
            // console.log(error);
        }
    }
    let nodeList = await getAllNode();
    nodeList = nodeList.filter(({ label }) => {
        return label && hasCnKeyword(label);
    });
    const res = raceANode(nodeList);
    // avaliUrl.push(res);
    return res;
}

async function raceANode(nodeList) {
    const promisePool = [];
    for (var i in nodeList) {
        promisePool.push(testNode(nodeList[i]));
    }
    const res = await Promise.race(promisePool);
    return res;
}
export default randomANode;
