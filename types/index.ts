export interface TBetEventParticipant {
  name: string;
}

export interface TBetEventMarketSelection {
  id: string;
  name: string;
  fullName: string;
  shortName: string;
  price: number;
  handicap: number;
  betRef: string;
  renderingLayout: number;
  columnIndex: number;
  BETANDO_SELECTION?: boolean;
}

export interface TBetEventMarket {
  id: string;
  name: string;
  type: string;
  handicap: number;
  marketCloseTimeMillis: number;
  renderingLayout: number;
  selections: Array<TBetEventMarketSelection>;
  scorerSelections: [];
  exactScoreSelections: [];
}

export interface TBetEvent {
  stats: [
    {
      url: string;
      providerId: number;
    }
  ];
  sportId: string;
  shortName: string;
  totalMarketsAvailable: number;
  hasMatchCombo: boolean;
  matchComboUrl: string;
  betRadarId: number;
  notes: string;
  tvChannel: string;
  regionName: string;
  regionId: string;
  leagueDescription: string;
  leagueId: string;
  streamOverlayMarketIds: [];
  willGoLive: boolean;
  id: string;
  name: string;
  startTime: number;
  url: string;
  markets: Array<TBetEventMarket>;
  participants: Array<TBetEventParticipant>;
}
