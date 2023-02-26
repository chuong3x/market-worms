export type ITrend = "LONG" | "SHORT" | "";
export interface ISetting {
  symbols: string[];
  interval: string;
  quantity: number;
  leverage: number;
  maxPositions: number;
  profitExpected: number;
  takeProfitOnly: boolean;
  autoDetectTrend: boolean;
  enableAvgMode: boolean;
  customTrend?: ITrend;
}
export interface IPosition {
  symbol: string;
  orderId: number;
  clientOrderId: string;
  price: number;
  origQty: string;
  executedQty: number;
  status: string;
  timeInForce: string;
  type: string;
  side: string;
  stopPrice: string;
  icebergQty: string;
  time: Date;
  isWorking: boolean;
}

export interface TradeOptions {
  symbols: string[];
  interval: string;
  profitExpected: number;
  leverage: number;
  quantity: number;
}
export interface ScanOptions {
  interval: string;
  profitExpected: number;
}
export interface ScanResult {
  symbol: string;
  tradeCount: number;
  profit: number;
}
export interface TradePayload {
  isTrade: boolean;
  options: TradeOptions;
}

export enum CandleChartInterval {
  ONE_MINUTE = "1m",
  THREE_MINUTES = "3m",
  FIVE_MINUTES = "5m",
  FIFTEEN_MINUTES = "15m",
  THIRTY_MINUTES = "30m",
  ONE_HOUR = "1h",
  TWO_HOURS = "2h",
  FOUR_HOURS = "4h",
  SIX_HOURS = "6h",
  EIGHT_HOURS = "8h",
  TWELVE_HOURS = "12h",
  ONE_DAY = "1d",
  THREE_DAYS = "3d",
  ONE_WEEK = "1w",
  ONE_MONTH = "1M",
}
