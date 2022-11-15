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
exports.getNextEvents = void 0;
const betanoApi_1 = __importDefault(require("./betanoApi"));
const marketSelectionWithMinimalPrice = (market) => {
    const MAX_PRICE = 1.3;
    const selectionWithMinimalPrice = market.selections.find((selection) => {
        const isMatchPrice = selection.price <= MAX_PRICE;
        return isMatchPrice;
    });
    if (selectionWithMinimalPrice) {
        return Object.assign(Object.assign({}, selectionWithMinimalPrice), { BETANDO_SELECTION: true });
    }
    return null;
};
const getBestEvents = (events) => {
    // console.log("🚀 ~ file: betanoIntagration.ts ~ line 19 ~ getBestEvents ~ events", events)
    const FINAL_RESULT_MARKET = "Resultado Final";
    const bestEvents = [];
    events.forEach((event) => {
        let finalResultMarket = event.markets.find((market) => market.name === FINAL_RESULT_MARKET);
        if (finalResultMarket) {
            const bestSelection = marketSelectionWithMinimalPrice(finalResultMarket);
            console.log("🚀 ~ file: betanoIntagration.ts ~ line 30 ~ bestEvents ~ bestSelection", bestSelection);
            if (bestSelection) {
                const parsedMarket = finalResultMarket.selections.map((selection) => {
                    if (selection.id === bestSelection.id) {
                        return bestSelection;
                    }
                    return selection;
                });
                bestEvents.push(Object.assign(Object.assign({}, event), { markets: [
                        Object.assign(Object.assign(Object.assign({}, event.markets), finalResultMarket), { selections: parsedMarket }),
                    ] }));
            }
        }
    });
    console.log("🚀 ~ file: betanoIntagration.ts ~ line 45 ~ getBestEvents ~ length", bestEvents.length);
    return bestEvents;
};
const getNextEvents = ({ hours = 3, sport = "futebol", }) => __awaiter(void 0, void 0, void 0, function* () {
    const URL = `/sport/${sport}/proximas-${hours}-horas/?req=la,l,s,stnf,c,mb,mbl`;
    try {
        const { data } = yield betanoApi_1.default.get(URL);
        const events = data.data.blocks[0].events;
        return getBestEvents(events);
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getNextEvents = getNextEvents;
