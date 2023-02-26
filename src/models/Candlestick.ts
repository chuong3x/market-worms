export interface Candlestick {
  openTime: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteVolume: string;
  trades: number;
  baseAssetVolume: string;
  quoteAssetVolume: string;
}

export interface CandlestickWithSignal extends Candlestick {
  sma: number[];
  rangeDn: number[];
  rangeUp2: number[];
  rangeDn2: number[];
  openLong: boolean[];
  openShort: boolean[];
  closeLong: boolean[];
  closeShort: boolean[];
}

export interface CandlestickForChart {
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: number;
  quoteVolume: string;
  trades: number;
  baseAssetVolume: string;
  quoteAssetVolume: string;
  sma: number[];
  filt: number[];
  filtUp: number[];
  filtDown: number[];
  rangeDn: number[];
  openLong: boolean[];
  openShort: boolean[];
  closeLong: boolean[];
  closeShort: boolean[];
}
