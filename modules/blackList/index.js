//gwflist
//https://raw.githubusercontent.com/Loyalsoldier/surge-rules/release/gfw.txt
import { join } from 'path';
import { Low, JSONFile } from 'lowdb';
const file = join('./', '.db/blackList.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
const maxLength = 1000;
const defaultTagName = "domains";

// 添加一个域名到数据库
export async function addBlackDomain(domain, tag = defaultTagName) {
    if (!domain || domain.length > 40) {
        return false;
    }
    try {
        const allDomains = await getBlackList(tag);
        const total = allDomains.length;
        if (total > maxLength) {
            allDomains.splice(0, total - maxLength);
        }
        const hasDomain = allDomains.find((item) => {
            return item === domain;
        });
        !hasDomain && allDomains.push(domain);
        db.data[tag] = allDomains;
        await db.write();
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// 读取自定义的黑名单
export async function getBlackList(tag = defaultTagName) {
    await db.read();
    if (!db.data) {
        db.data = { domains: [] };
        db.data[tag] = [];
    }

    return db.data[tag] || [];
}

export async function removeDomain(domain, tag = defaultTagName) {
    try {
        const allDomains = await getBlackList(tag);
        const index = allDomains.findIndex((domainItem) => {
            return domainItem === domain;
        });

        if (index > -1) {
            allDomains.splice(index, 1);
        }
        db.data[tag] = allDomains;
        await db.write();
        return true;
    } catch (error) {
        return false;
    }
}
