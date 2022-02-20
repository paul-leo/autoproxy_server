module.exports = {
    name: 'AutoProxy',
    script: 'npm run start',
    // 指定监听的文件夹
    watch: true,
    // 指定延迟时间
    watch_delay: 1000,
    'pre-setup': 'npm install',
    // 指定要忽略的文件夹
    ignore_watch: ['node_modules', '.db', '.github'],
};
