import express from 'express';
const app = express();
const port = 5000;
import DB from './db.js';

app.get('/saveip', async (req, res) => {
    const { key, ip } = req.query;
    const result = { code: 0, msg: '' };
    if (!key || !ip) {
        result.code = -1;
        res.msg = 'ip或key不能为空';
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
    const result = { code: 0, data:'http://1.117.90.174:5600' };
    await res.send(JSON.stringify(result));
});
app.get('/proxy-config', async (req, res) => {
    await res.send(JSON.stringify(result));
});
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
