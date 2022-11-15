import { TBetEvent, TBetEventMarket } from "../types";
import betanoInstance from "./betanoApi";

const marketSelectionWithMinimalPrice = (market: TBetEventMarket) => {
  const MAX_PRICE = 1.3;
  const selectionWithMinimalPrice = market.selections.find((selection: any) => {
    const isMatchPrice = selection.price <= MAX_PRICE;
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
  // console.log("🚀 ~ file: betanoIntagration.ts ~ line 19 ~ getBestEvents ~ events", events)
  const FINAL_RESULT_MARKET = "Resultado Final";
  const bestEvents: Array<TBetEvent> = [];

  events.forEach((event) => {
    let finalResultMarket = event.markets.find(
      (market: any) => market.name === FINAL_RESULT_MARKET
    );

    if (finalResultMarket) {
      const bestSelection = marketSelectionWithMinimalPrice(finalResultMarket);
      console.log(
        "🚀 ~ file: betanoIntagration.ts ~ line 30 ~ bestEvents ~ bestSelection",
        bestSelection
      );

      if (bestSelection) {
        const parsedMarket = finalResultMarket.selections.map((selection) => {
          if (selection.id === bestSelection.id) {
            return bestSelection;
          }
          return selection;
        });
        bestEvents.push({
          ...event,
          markets: [
            {
              ...event.markets,
              ...finalResultMarket,
              selections: parsedMarket,
            },
          ],
        });
      }
    }
  });

  console.log(
    "🚀 ~ file: betanoIntagration.ts ~ line 45 ~ getBestEvents ~ length",
    bestEvents.length
  );

  return bestEvents;
};

const getNextEvents = async ({
  hours = 3,
  sport = "futebol",
}: {
  hours?: any;
  sport?: string;
}) => {
  const URL = `/sport/${sport}/proximas-${hours}-horas/?req=la,l,s,stnf,c,mb,mbl`;

  try {
    const { data } = await betanoInstance.get(URL);

    const events = data.data.blocks[0].events;

    return getBestEvents(events);
  } catch (err) {
    console.log(err);

    throw err;
  }
};

export { getNextEvents };
