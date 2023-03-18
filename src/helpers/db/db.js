import { join } from 'path';
import { Low, JSONFile } from 'lowdb';
const file = join('./', '.db/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
const DB = {
    async saveIP(key, value) {
        try {
            await db.read();
            if (!db.data) {
                db.data = { ips: {} };
            }
            db.data.ips[key] = value;
            await db.write();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async getIP(key) {
        if (!key) {
            return;
        }
        await db.read();
        if (!db.data) {
            db.data = { ips: {} };
        }
        const { ips } = db.data;
        return ips[key];
    },
    async saveLog(msg) {
        try {
            await db.read();
            if (!db.data) {
                db.data = { logs: [] };
            }
            db.data.logs.push(msg);
            await db.write();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async getLogs() {
        await db.read();
        if (!db.data) {
            db.data = { logs: [] };
        }
        const { logs } = db.data;
        return logs;
    },
    /**
     * 保存内网穿透端口
     * @param {*} deviceId
     * @param {*} port
     * @returns
     */
    async saveIntranetPort(deviceId, port) {
        try {
            await db.read();
            if (!db.data) {
                db.data = { intranetPorts: {} };
            }
            db.data.intranetPorts[deviceId] = port;
            await db.write();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    /**
     * 获取内网穿透地址
     * @param {*} deviceId
     * @returns
     */
    async getIntranetPort(deviceId) {
        if (!deviceId) {
            return;
        }
        await db.read();
        if (!db.data) {
            db.data = { intranetPorts: {} };
        }
        const { intranetPorts } = db.data;
        return intranetPorts[deviceId];
    },
    /**
     * 获取所有的内网端口号
     * @returns
     */
    async getAllIntranetPort() {
        await db.read();
        if (!db.data) {
            db.data = { intranetPorts: {} };
        }
        return intranetPorts;
    },
};
export default DB;
