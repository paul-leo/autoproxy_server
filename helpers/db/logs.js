import { join } from 'path';
import { Low, JSONFile } from 'lowdb';
const file = join('./', '.db/log.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
const maxLength = 100;
const Logs = {
    async saveLog(appName = '', msg) {
        if (!appName) {
            return false;
        }
        try {
            await db.read();
            if (!db.data) {
                db.data = { logs: {} };
            }
            if (!db.data.logs[appName]) {
                db.data.logs[appName] = [];
            }
            const total = db?.data?.logs?.[appName].length;
            if (total > maxLength) {
                db?.data?.logs?.[appName].splice(maxLength, total - maxLength);
            }
            db.data.logs[appName].splice(0, 0, msg);
            await db.write();
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    async getLogs(appName = '') {
        if (!appName) {
            return false;
        }
        await db.read();
        if (!db.data) {
            db.data = { logs: {} };
        }

        return db?.data?.logs?.[appName] || [];
    },
};
export default Logs;
