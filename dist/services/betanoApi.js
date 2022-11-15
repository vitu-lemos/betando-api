"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const environment_1 = __importDefault(require("../environment"));
const BETANO_BASE_URL = environment_1.default.BETANO_BASE_URL;
const betanoInstance = axios_1.default.create({
    baseURL: `${BETANO_BASE_URL}`,
});
exports.default = betanoInstance;
