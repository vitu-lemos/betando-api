import { TBetEvent, TBetEventMarket } from "../types";
import { BET_MAX_ODD, FINAL_RESULT_MARKET_NAME } from "../constants";
import betanoInstance from "./betanoApi";

const marketSelectionWithMinimalPrice = (market: TBetEventMarket) => {
  const selectionWithMinimalPrice = market.selections.find((selection: any) => {
    const isMatchPrice = selection.price <= BET_MAX_ODD;
    return isMatchPrice;
  });
  if (selectionWithMinimalPrice) {
    return {
      ...selectionWithMinimalPrice,
      BETANDO_SELECTION: true,
    };
  }
  return null;
};

const getBestEvents = (events: Array<TBetEvent>) => {
  const bestEvents: Array<TBetEvent> = [];

  events.forEach((event) => {
    let finalResultMarket = event.markets.find(
      (market: any) => market.name === FINAL_RESULT_MARKET_NAME
    );

    if (finalResultMarket) {
      const bestSelection = marketSelectionWithMinimalPrice(finalResultMarket);

      if (bestSelection) {
        const parsedMarket = finalResultMarket.selections.map((selection) => {
          if (selection.id === bestSelection.id) {
            return bestSelection;
          }
          return selection;
        });

        const newEventMarkets = event.markets.map((market) => {
          if (market.name === FINAL_RESULT_MARKET_NAME) {
            return {
              ...market,
              selections: parsedMarket,
            };
          }
          return market;
        });

        bestEvents.push({
          ...event,
          markets: newEventMarkets,
        });
      }
    }
  });

  return bestEvents;
};

const getNextBetanoEvents = async ({
  hours = 3,
  sport = "futebol",
}: {
  hours?: any;
  sport?: string;
}) => {
  const URL = `/sport/${sport}/proximas-${hours}-horas/?req=la,l,s,stnf,c,mb,mbl`;

  try {
    const { data } = await betanoInstance.get(URL);
    const blocks = data?.data?.blocks || [];
    const events = blocks[0]?.events || [];
    const response = { events: getBestEvents(events) };

    return response;
  } catch (err) {
    console.log(err);

    throw err;
  }
};

export { getNextBetanoEvents };
