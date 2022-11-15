"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = __importDefault(require("./environment"));
const betanoIntagration_1 = require("./services/betanoIntagration");
const app = (0, express_1.default)();
const port = environment_1.default.PORT;
console.log("🚀 ~ file: index.ts ~ line 12 ~ port", port);
app.get("/", (req, res) => {
    res.send("Betando api, let`s bet");
});
app.get("/next-bets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const hoursRange = ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.hoursRange) || 3;
        res.set("Access-Control-Allow-Origin", "http://localhost:3001");
        const events = yield (0, betanoIntagration_1.getNextEvents)({ hours: hoursRange });
        res.json({ events });
    }
    catch (err) {
        res.status(500).json({ message: "failed to get next events", error: err });
    }
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
