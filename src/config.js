const ENV = import.meta.env.VITE_APP_ENV || "local";

const configs = {
  local: {
    APP_NAME: "Technical Test FE",
    BASE_URL: "http://localhost:3000/api",
    ENABLE_LOGGING: true,
  },

  uat: {
    APP_NAME: "Technical Test FE",
    BASE_URL: "https://uat-api.yourdomain.com/API",
    ENABLE_LOGGING: true,
  },

  production: {
    APP_NAME: "Technical Test FE",
    BASE_URL: "https://assignment-be.evancendekia.com/api",
    ENABLE_LOGGING: false,
  },
};

if (!configs[ENV]) {
  throw new Error(`Invalid environment: ${ENV}`);
}
const config = {
  ...configs[ENV],
  ENV,
};

export default config;