// Shared env vars in all environments

var shared = {
  API_HOST: process.env.API_HOST || "http://localhost:3000",
  API_URL: process.env.API_URL || "/api",
  DOMAIN: process.env.DOMAIN || 'http://127.0.0.1',
};

//
var environments = {
  development: {
    ENV_VARS: shared
  },
  staging: {
    ENV_VARS: shared
  },
  production: {
    ENV_VARS: shared
  }
};
environments.production.buildpack  = process.env.BUILDPACK_URL;

module.exports = environments;
