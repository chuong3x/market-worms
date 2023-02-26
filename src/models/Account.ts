export type TimeInForce_LT = "GTC" | "IOC" | "FOK";

export const enum TimeInForce {
  GTC = "GTC",
  IOC = "IOC",
  FOK = "FOK",
}
export type ExecutionType_LT =
  | "NEW"
  | "CANCELED"
  | "REPLACED"
  | "REJECTED"
  | "TRADE"
  | "EXPIRED";

export const enum ExecutionType {
  NEW = "NEW",
  CANCELED = "CANCELED",
  REPLACED = "REPLACED",
  REJECTED = "REJECTED",
  TRADE = "TRADE",
  EXPIRED = "EXPIRED",
}
export type PositionSide_LT = "BOTH" | "SHORT" | "LONG";

export const enum PositionSide {
  BOTH = "BOTH",
  SHORT = "SHORT",
  LONG = "LONG",
}
export type MarginType_LT = "ISOLATED" | "CROSSED";
export interface Balances {
  [key: string]: {
    available: string;
    locked: string;
  };
}
export interface Balance {
  asset: string;
  walletBalance: string;
  crossWalletBalance: string;
  balanceChange: string;
}

export interface Position {
  symbol: string;
  positionAmount: string;
  entryPrice: string;
  accumulatedRealized: string;
  unrealizedPnL: string;
  marginType: "isolated" | "cross";
  isolatedWallet: string;
  positionSide: PositionSide_LT;
}
export interface FuturesAccountPosition {
  symbol: string;
  initialMargin: string;
  maintMargin: string;
  unrealizedProfit: string;
  positionInitialMargin: string;
  openOrderInitialMargin: string;
  leverage: string;
  isolated: boolean;
  entryPrice: string;
  maxNotional: string;
  positionSide: PositionSide_LT;
  positionAmt: string;
  notional: string;
  isolatedWallet: string;
  updateTime: number;
  bidNotional: string;
  askNotional: string;
}

export type FuturesAssetType =
  | "DOT"
  | "BTC"
  | "SOL"
  | "BNB"
  | "ETH"
  | "ADA"
  | "USDT"
  | "XRP"
  | "BUSD";
export type FuturesAsset = {
  asset: FuturesAssetType;

  walletBalance: string;

  unrealizedProfit: string;

  marginBalance: string;

  maintMargin: string;

  initialMargin: string;

  positionInitialMargin: string;

  openOrderInitialMargin: string;

  maxWithdrawAmount: string;

  crossWalletBalance: string;

  crossUnPnl: string;

  availableBalance: string;

  marginAvailable: boolean;

  updateTime: number;
};
export interface FuturesAccountInfoResult {
  feeTier: number;
  canTrade: boolean;
  canDeposit: boolean;
  canWithdraw: boolean;
  updateTime: number;
  totalInitialMargin: string;
  totalMaintMargin: string;
  totalWalletBalance: string;
  totalUnrealizedProfit: string;
  totalMarginBalance: string;
  totalPositionInitialMargin: string;
  totalOpenOrderInitialMargin: string;
  totalCrossWalletBalance: string;
  totalCrossUnPnl: string;
  availableBalance: string;
  maxWithdrawAmount: string;
  assets: FuturesAsset[];
  positions: FuturesAccountPosition[];
}
export type EventReasonType =
  | "DEPOSIT"
  | "WITHDRAW"
  | "ORDER"
  | "FUNDING_FEE"
  | "WITHDRAW_REJECT"
  | "ADJUSTMENT"
  | "INSURANCE_CLEAR"
  | "ADMIN_DEPOSIT"
  | "ADMIN_WITHDRAW"
  | "MARGIN_TRANSFER"
  | "MARGIN_TYPE_CHANGE"
  | "ASSET_TRANSFER"
  | "OPTIONS_PREMIUM_FEE"
  | "OPTIONS_SETTLE_PROFIT"
  | "AUTO_EXCHANGE";
export type FuturesOrderType_LT =
  | "LIMIT"
  | "MARKET"
  | "STOP"
  | "TAKE_PROFIT"
  | "STOP_MARKET"
  | "TAKE_PROFIT_MARKET"
  | "TRAILING_STOP_MARKET";
export type OrderStatus_LT =
  | "CANCELED"
  | "EXPIRED"
  | "FILLED"
  | "NEW"
  | "PARTIALLY_FILLED"
  | "PENDING_CANCEL"
  | "REJECTED";
export type WorkingType_LT = "MARK_PRICE" | "CONTRACT_PRICE";

export const enum WorkingType {
  MARK_PRICE = "MARK_PRICE",
  CONTRACT_PRICE = "CONTRACT_PRICE",
}
export const enum OrderStatus {
  CANCELED = "CANCELED",
  EXPIRED = "EXPIRED",
  FILLED = "FILLED",
  NEW = "NEW",
  PARTIALLY_FILLED = "PARTIALLY_FILLED",
  PENDING_CANCEL = "PENDING_CANCEL",
  REJECTED = "REJECTED",
}
export const enum OrderType {
  LIMIT = "LIMIT",
  LIMIT_MAKER = "LIMIT_MAKER",
  MARKET = "MARKET",
  STOP = "STOP",
  STOP_MARKET = "STOP_MARKET",
  STOP_LOSS_LIMIT = "STOP_LOSS_LIMIT",
  TAKE_PROFIT_LIMIT = "TAKE_PROFIT_LIMIT",
  TAKE_PROFIT_MARKET = "TAKE_PROFIT_MARKET",
  TRAILING_STOP_MARKET = "TRAILING_STOP_MARKET",
}
export interface AccountConfigUpdateBase {
  eventTime: number;
  eventType: "ACCOUNT_CONFIG_UPDATE";
  transactionTime: number;
  type: "ACCOUNT_CONFIG" | "MULTI_ASSETS";
}
export interface AccountConfigUpdateConfig extends AccountConfigUpdateBase {
  type: "ACCOUNT_CONFIG";
  symbol: string;
  leverage: number;
}
export interface AccountConfigUpdateMultiAssets
  extends AccountConfigUpdateBase {
  type: "MULTI_ASSETS";
  multiAssets: boolean;
}
export type OrderSide_LT = "BUY" | "SELL";

export const enum OrderSide {
  BUY = "BUY",
  SELL = "SELL",
}
export interface OutboundAccountInfo {
  balances: Balances;
  makerCommissionRate: number;
  takerCommissionRate: number;
  buyerCommissionRate: number;
  sellerCommissionRate: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  lastAccountUpdate: number;
  eventType: "account";
  eventTime: number;
}
export type AccountConfigUpdate =
  | AccountConfigUpdateConfig
  | AccountConfigUpdateMultiAssets;
export interface MarginCall {
  eventType: "MARGIN_CALL";
  eventTime: number;
  crossWalletBalance: string;

  positions: {
    symbol: string;
    positionSide: PositionSide_LT;
    positionAmount: string;
    marginType: MarginType_LT;
    isolatedWallet: string;
    markPrice: string;
    unrealizedPnL: string;
    maintenanceMarginRequired: string;
  }[];
}
export interface AccountUpdate {
  eventTime: number;
  eventType: "ACCOUNT_UPDATE";
  transactionTime: number;
  eventReasonType: EventReasonType;
  balances: Balance[];
  positions: Position[];
}
export interface OrderUpdate {
  eventType: "ORDER_TRADE_UPDATE";
  eventTime: number;
  transactionTime: number;
  symbol: string;
  clientOrderId: string;
  side: OrderSide;
  orderType: FuturesOrderType_LT;
  timeInForce: TimeInForce;
  quantity: string;
  price: string;
  averagePrice: string;
  stopPrice: string;
  executionType: ExecutionType;
  orderStatus: OrderStatus;
  orderId: number;
  lastTradeQuantity: string;
  totalTradeQuantity: string;
  priceLastTrade: string;
  commissionAsset: string | null;
  commission: string;
  orderTime: number;
  tradeId: number;
  bidsNotional: string;
  asksNotional: string;
  isMaker: boolean;
  isReduceOnly: boolean;
  workingType: WorkingType;
  originalOrderType: FuturesOrderType_LT;
  positionSide: PositionSide;
  closePosition: boolean;
  activationPrice: string;
  callbackRate: string;
  realizedProfit: string;
}
