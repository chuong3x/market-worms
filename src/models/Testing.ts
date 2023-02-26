export interface TestingOrder {
  _id: string;
  executedQty: string;
  price: string;
  side: "L" | "S";
  time: Date; // order time
  type: "OPEN" | "CLOSE";
}
export interface TestingResultItem {
  openPrice: number;
  closePrice: number;
  side: "L" | "S";
  openTime: Date; // order time
  closeTime: Date;
}
