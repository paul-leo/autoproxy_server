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
};
export default DB;
