require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });

export default {
  env: process.env.NODE_ENV,
  BETANO_BASE_URL: process.env.BETANO_BASE_URL,
  PORT: process.env.PORT,
};
