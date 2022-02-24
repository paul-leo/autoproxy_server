import express from 'express';
import DB from './db.js';
import fs from 'fs-extra';
const app = express();
const port = 8801;

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
app.get('/proxy-config', (req, res) => {
    const result = {
        code: 0,
        data: 'tls://hk-m9.olg-food.icu:443,ws://@/fbi-open-the-door,vmess://2ab48700-5c25-384d-9680-bc389466f9dc@?alertID=2',
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
app.use('/auto-update', express.static('auto-update'));
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
