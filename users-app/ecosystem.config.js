module.exports = {
    apps : [{
      name   : "users-app",
      script : "server/index.js",
      env_production: {
         NODE_ENV: "production"
      },
      env_development: {
         NODE_ENV: "development"
      }
    }]
  }