import express from 'express';
import DB from './helpers/db/db.js';
import Logs from './helpers/db/logs.js';
import fs from 'fs-extra';
import bodyParser from 'body-parser';
import {
    getAllNode,
    toGliderForward,
    randomANode,
} from './modules/airport/index.js';
import {
    addBlackDomain,
    getBlackList,
    removeDomain,
} from './modules/blackList/index.js';

process.env.TZ = 'Asia/Shanghai';
const app = express();
const port = 8801;
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/saveip', async (req, res) => {
    const { key, ip } = req.query;
    const result = { code: 0, msg: '' };
    if (!key) {
        result.code = -1;
        result.msg = 'key不能为空';
    } else {
        const saveRes = await DB.saveIP(key, ip);
        if (!saveRes) {
            result.code = -2;
            result.msg = '保存失败';
        }
    }
    await res.send(JSON.stringify(result));
});

app.get('/getip', async (req, res) => {
    const { key } = req.query;
    const result = { code: 0, msg: '' };
    const ip = await DB.getIP(key);
    if (!ip) {
        result.code = -1;
        result.msg = '获取失败';
    } else {
        result.data = { ip };
    }
    await res.send(JSON.stringify(result));
});
app.get('/proxy-config', async (req, res) => {
    const forward = toGliderForward(await randomANode());
    const result = {
        code: 0,
        data: forward,
    };
    res.send(JSON.stringify(result));
});

app.get('/all-proxy', async (req, res) => {
    const list = await getAllNode();
    const result = {
        code: 0,
        data: list,
    };
    res.send(JSON.stringify(result));
});

app.get('/pac', async (req, res) => {
    const { key } = req.query;
    var pacContent = await fs.readFile('./pac.js', {
        encoding: 'utf8',
    });
    const ip = await DB.getIP(key);
    pacContent = pacContent.replace(
        /__DEV_PROXY__/gi,
        ip ? 'PROXY ' + ip : 'DIRECT'
    );
    res.send(pacContent);
});

app.post('/log', async (req, res) => {
    const { msg, appname } = req.body || {};
    try {
        const logList = await Logs.saveLog(appname, {
            msg,
            ip: req.ip,
            time: new Date().toLocaleString(),
        });
        res.sendStatus(logList ? 200 : 400);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.get('/log', async (req, res) => {
    const { appname } = req.query;
    try {
        const msg = await Logs.getLogs(appname);
        res.send(JSON.stringify({ data: msg, code: 200 }));
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ msg: error, code: 400 }));
    }
});

app.use('/', express.static('static'));

app.get('/addBlackDomain', async (req, res) => {
    const { domain = '', tag = "domains" } = req.query;
    const result = { code: 0, msg: '保存成功' };
    if (!domain) {
        result.code = -1;
        result.msg = 'domain不能为空';
    } else {
        const saveRes = await addBlackDomain(domain, tag);
        if (!saveRes) {
            result.code = -2;
            result.msg = '保存失败';
        }
    }
    await res.send(JSON.stringify(result));
});

app.get('/removeBlackDomain', async (req, res) => {
    const { domain = '', tag = "domains" } = req.query;
    const result = { code: 0, msg: '保存成功' };
    if (!domain) {
        result.code = -1;
        result.msg = 'domain不能为空';
    } else {
        const saveRes = await removeDomain(domain, tag);
        if (!saveRes) {
            result.code = -2;
            result.msg = '保存失败';
        }
    }
    await res.send(JSON.stringify(result));
});

app.get('/getBlackDomains', async (req, res) => {
    const result = { code: 0, msg: '保存成功' };
    const { tag = "domains" } = req.query;
    const allDomains = await getBlackList(tag);
    result.list = allDomains;
    await res.send(JSON.stringify(result));
});

app.use('/auto-update', express.static('auto-update'));
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
