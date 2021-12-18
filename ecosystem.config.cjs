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
            host: ['192.168.0.13', '192.168.0.14', '192.168.0.15'],
            ref: 'origin/master',
            repo: 'git@github.com:Username/repository.git',
            path: '/var/www/my-repository',
            'post-deploy': 'npm install',
        },
    },
};
