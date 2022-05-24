import { Stock, StockItem } from "../types";

// convert stock data to chart data
export const convertData = (stocks: Stock[]): StockItem[] => {
  let stockItems: StockItem[] = [];

  for (let stock of stocks) {
    let item = new StockItem();
    Object.assign<StockItem, StockItem>(item, {
      date: new Date(stock.date),
      open: parseFloat(stock.open),
      high: parseFloat(stock.high),
      low: parseFloat(stock.low),
      close: parseFloat(stock.close),
      volume: parseFloat(stock.volume),
    })
    stockItems.push(item);

  }

  return stockItems;
}