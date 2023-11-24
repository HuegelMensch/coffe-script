module.exports = {
  apps: [
    {
      name: 'next',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: -1,
      watch: false,
      exec_mode: 'cluster',
      cron_restart: '0 * * * *', // Restart every hour
    },
  ],
};
