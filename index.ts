import express, { Express, Request, Response } from "express";
import environment from "./environment";
import { getNextBetanoEvents } from "./services/betanoIntagration";

const app: Express = express();
const port = environment.PORT;

console.log("🚀 ~ file: index.ts ~ line 12 ~ port", port);

app.get("/", (req: Request, res: Response) => {
  res.send("Betando api, let`s bet");
});

app.get("/next-bets", async (req: Request, res: Response) => {
  try {
    const hoursRange =  req?.query?.hoursRange || 3;
    res.set("Access-Control-Allow-Origin", "http://localhost:3001");
    const events = await getNextBetanoEvents({ hours: hoursRange });

    res.json({ events });
  } catch (err) {
    res.status(500).json({ message: "failed to get next events", error: err });
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
