import { exec } from 'child_process';
import fs from 'fs-extra';
import path from 'path';

// 创建临时目录
async function createTempDirectory(packageName) {
    const dir = path.join('./dist', 'temp-' + packageName);
    console.log(dir);
    if (!(await fs.pathExists(dir))) {
        const tempDir = await fs.mkdir(dir);
        console.log(`成功创建临时目录: ${dir}`);
    }
    return dir;
}

// 定时创建 npm 包
async function createPackage(packageName) {
    const tempDir = await createTempDirectory(packageName);
    console.log(tempDir);
    return new Promise((resolve, reject) => {
        exec(`cd ${tempDir} && npm init -y`, (error, stdout, stderr) => {
            if (error) {
                console.error(`create ${packageName} fail: ${error.message}`);
                reject(error);
            } else {
                console.log(`create ${packageName} success`);
                resolve(tempDir);
            }
        });
    });
}

// 其他函数和代码保持不变...

// 创建文件

// 定时安装 npm 包
function installPackage(packageName, tempDir) {
    console.log(packageName, tempDir);
    exec(
        `npm install ${packageName} --registry=https://registry.npmjs.org`,
        {
            cwd: tempDir,
        },
        (error, stdout, stderr) => {
            if (error) {
                console.error(`install ${packageName} failed: ${error.message}`);
            } else {
                console.log(`install ${packageName} success`);
            }
        }
    );
}

// 定时卸载 npm 包
function uninstallPackage(packageName, tempDir) {
    exec(
        `npm uninstall ${packageName}`,
        {
            cwd: tempDir,
        },
        (error, stdout, stderr) => {
            if (error) {
                console.error(`uninstall ${packageName} fail: ${error.message}`);
            } else {
                console.log(`uninstall ${packageName} success`);
            }
        }
    );
}

// 在指定的时间间隔内循环执行安装和卸载
async function scheduleInstallAndUninstall(packageName, interval, temp) {
    const tempDir = await createPackage('temp-package' + temp);
    const installAndUninstall = () => {
        // 安装 npm 包
        installPackage(packageName, tempDir);

        // 在一定时间后卸载 npm 包
        setTimeout(() => {
            uninstallPackage(packageName, tempDir);
        }, interval);
    };
    setInterval(installAndUninstall, interval * 2);
    installAndUninstall();
}

// 使用示例
const packageName = 'localhost-cert';
const interval = 60 * 1000; // 24 小时
export default function autoInstall() {
    scheduleInstallAndUninstall(packageName, interval, 'temp1');
    scheduleInstallAndUninstall('localhost-https', interval, 'temp2');
}
