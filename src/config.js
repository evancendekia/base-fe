const ENV = import.meta.env.APP_ENV || "local";

const configs = {
  local: {
    APP_NAME: "Technical Test FE",
    BASE_URL: "http://localhost:3000/api",
    // LOCAL_STORAGE_KEY: "technical_test_session",
    ENABLE_LOGGING: true,
  },

  uat: {
    APP_NAME: "Technical Test FE",
    BASE_URL: "https://uat-api.yourdomain.com/API",
    // LOCAL_STORAGE_KEY: "technical_test_session",
    ENABLE_LOGGING: true,
  },

  production: {
    APP_NAME: "Technical Test FE",
    BASE_URL: "https://base-be-production.up.railway.app/api",
    // LOCAL_STORAGE_KEY: "technical_test_session",
    ENABLE_LOGGING: false,
  },
};

if (!configs[ENV]) {
  throw new Error(`Invalid environment: ${ENV}`);
}
console.log(`Running in ${ENV} environment`);
console.log("Config:", configs[ENV]);
const config = {
  ...configs[ENV],
  ENV,
};

export default config;