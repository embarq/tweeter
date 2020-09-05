module.exports = {
  apps: [
    {
      name: 'escs-landing-dev',
      script: 'node_modules/.bin/next',
      args: 'dev -p 4080',
      time: true,
      watch: false,
      restart_delay: 3000
    }
  ]
}
