module.exports = {
  apps : [
    {
      name : 'world-clocks',
      script : 'server.js',
      watch: ['api', 'libs', 'config'],
      ignore_watch : ['node_modules', '.git'],
      env: { NODE_PATH: './'},
      autorestart: false,
      max_restarts: 1,
    },
  ],
};
