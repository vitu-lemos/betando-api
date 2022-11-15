"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });
exports.default = {
    env: process.env.NODE_ENV,
    BETANO_BASE_URL: process.env.BETANO_BASE_URL,
    PORT: process.env.PORT,
};
