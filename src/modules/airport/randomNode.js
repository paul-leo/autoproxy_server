import getAllNode from './getAllNode.js';
import { tcpPingPort } from 'tcp-ping-port';
let avaliUrl = [];
const cnKeyWords = [
    'hk',
    '香港',
    '新加坡',
    '台湾',
    '澳门',
    'jp',
    'sg',
    'tw',
    '日本',
    'kr',
    '韩国',
];
function hasCnKeyword(label) {
    // return cnKeyWords.some((keyword) => {
    //     return label.indexOf(keyword) > -1;
    // });
    return true;
}

async function testNode(node) {
    const { host, port } = node;
    const options = {
        socketTimeout: 3000,
        dnsTimeout: 3000,
    };
    const startTime = Date.now();
    const res = await tcpPingPort(host, Number(port), options);
    const endTime = Date.now();
    const spendTime = endTime - startTime;
    return {
        node,
        spendTime,
        online: res.online,
    };
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
        let node = nodeList[i];
        if (
            node.label.indexOf('最新网站') > -1 ||
            node.label.indexOf('防失联') > -1 ||
            node.host === '127.0.0.1'
        ) {
            continue;
        }
        promisePool.push(testNode(nodeList[i]));
    }
    let res = await Promise.all(promisePool);
    res = res.sort((a, b) => {
        return a.spendTime - b.spendTime;
    });
    return res[0].node;
}
export default randomANode;
