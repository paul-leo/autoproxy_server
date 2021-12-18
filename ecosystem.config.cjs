module.exports = {
    name: 'AutoProxy',
    script: 'npm install && npm run start',
    // 指定监听的文件夹
    // watch: ['server', 'client'],
    // 指定延迟时间
    watch_delay: 1000,
    'pre-setup': 'pnpm install',
    // 指定要忽略的文件夹
    ignore_watch: ['node_modules'],
    deploy: {
        production: {
            user: 'ubuntu',
            host: ['121.43.183.161'],
            ref: 'origin/master',
            repo: 'https://github.com/IdeaNest-org/autoproxy_server.git',
            path: '/var/www/autoproxy_server',
            'post-deploy': 'npm install',
        },
    },
};
