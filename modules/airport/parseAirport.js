// const SUB_URL = `https://fibsub-sys.cyou/link/Lb9LcVznte0OwJar?list=shadowrocket`;
// const SUB_URL = `https://config.51catss.com/api/v1/client/subscribe?token=f6d5f2a2821c0c7095c8616b35a85030`;

import axios from 'axios';

async function parseAirport(subUrl) {
    try {
        const res = await axios({
            timeout: 10000,
            method: 'get',
            url: subUrl,
            responseType: 'text',
        });
        if(!data){
            return [];
        }
        const data = decodeBase64(res.data);
        const proxyArr = data.split(`\n`);
        // console.log(proxyArr);
        // console.log(parserNode(proxyArr[10]));
        const nodeList = [];
        proxyArr.forEach((item) => {
            const nodeInfo = parserNode(item);
            nodeInfo && nodeList.push(nodeInfo);
        });
        return nodeList;
    } catch (error) {
        return [];
    }
    
}

function parserNode(str) {
    try {
        if (str.startsWith('ss://')) {
            return parseSS(str);
        }
        if (str.startsWith('trojan://')) {
            return parseTrojan(str);
        }
        if (str.startsWith('vmess://')) {
            return parseVmess(str);
        }
        return null;
    } catch (error) {
        return null;
    }
}

function parseSS(str) {
    const reg =
        /^([A-Za-z0-9-]+)\:\/\/([A-Za-z0-9]+)(?:\@([a-zA-Z\d.-]+)\:(\d+))?(?:\#(.*))?/i;
    const matchArr = str.match(reg);
    let [_, protocol, password = '', host = '', port = '', label = ''] =
        matchArr;
    password = decodeBase64(password);
    label = decodeURI(label);
    const passwordReg =
        /^([A-Za-z0-9-]+):([A-Za-z0-9-]+)(?:\@([a-zA-Z\d.-]+)\:(\d+))?/i;
    const passwordMatchArr = password.match(passwordReg);
    return {
        protocol,
        encrypt: passwordMatchArr[1],
        password: passwordMatchArr[2],
        host: passwordMatchArr[3] || host,
        port: passwordMatchArr[4] || port,
        label,
    };
}

function parseVmess(str) {
    const tempArr = str.replace('vmess://', '').split('?');
    const urlInfoStr = decodeBase64(tempArr[0]);
    const queryStr = decodeURI(tempArr[1]);

    const reg =
        /^([A-Za-z0-9-]+):([A-Za-z0-9-]+)(?:\@([a-zA-Z\d.-]+)\:(\d+))?/i;
    const matchArr = urlInfoStr.match(reg);
    const [_, encrypt, password, host, port] = matchArr;
    return {
        protocol: 'vmess',
        encrypt,
        password,
        host,
        port,
        params: parseQuery(queryStr),
    };
}

function parseTrojan(str) {
    // trojan://33e09e6f-2781-3f67-b88d-2e3f93af039e@jp-s.fib-sys.xyz:23231?peer=jp-s.fib-sys.xyz#%E6%97%A5%E6%9C%AC%20S%200.5%E5%80%8D
    const reg =
        /^([A-Za-z0-9-]+)\:\/\/([A-Za-z0-9-]+)(?:\@([a-zA-Z\d.-]+)\:(\d+)(?:\?([a-zA-Z-.=&]+))?)?(?:\#(.*))?/i;
    const matchArr = str.match(reg);
    const [_, protocol, password, host, port, params, label = ''] = matchArr;

    return {
        protocol,
        password,
        host,
        port,
        params: parseQuery(params),
        label: decodeURI(label),
    };
}

function parseQuery(queryStr) {
    const queryParams = {};
    const queryArr = queryStr.split('&');
    queryArr.forEach((item) => {
        const temp = item.split('=');
        queryParams[temp[0]] = temp[1];
    });
    return queryParams;
}

function decodeBase64(str) {
    let buff = new Buffer.from(str, 'base64');
    let text = buff.toString('utf-8');
    return text;
}
export default parseAirport;