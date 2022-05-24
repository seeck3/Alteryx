export type Stock = {
  Name: string
  close: string
  date: string
  high: string
  low: string
  open: string
  volume: string
}

export type Portfolio = {
  stock: Stock
  shares: string
}

export type PortfolioResponse = {
  id: number
  portfolio: Portfolio[]
}

export class StockItem {
  public open?: number;
  public close?: number;
  public high?: number;
  public low?: number;
  public volume?: number;

  public date?: Date;

}