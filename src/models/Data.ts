import { Candlestick } from "./Candlestick";

export interface Data {
  symbol: string;
  data: Candlestick[];
}

export interface Order {
  avgPrice: string;
  clientOrderId: string;
  cumQuote: string;
  executedQty: string;
  orderId: number;
  origQty: string;
  origType: string;
  price: string;
  reduceOnly: boolean;
  side: string;
  positionSide: string;
  status: string;
  stopPrice: string; // please ignore when order type is TRAILING_STOP_MARKET
  closePosition: boolean; // if Close-All
  symbol: string;
  time: number; // order time
  timeInForce: string;
  type: string;
  activatePrice: string; // activation price, only return with TRAILING_STOP_MARKET order
  priceRate: string; // callback rate, only return with TRAILING_STOP_MARKET order
  updateTime: number; // update time
  workingType: string;
  priceProtect: boolean;
}
