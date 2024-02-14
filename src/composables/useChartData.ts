import type { StockQuote } from '@/types/Stockquote';

export default (data: StockQuote[]) => {
  const dtArray: number[] = [];
  const priceArray: number[] = [];
  const amountArray: number[] = [];

  data.forEach((stockQuote) => {
    dtArray.push(stockQuote.dt);
    priceArray.push(stockQuote.price);
    amountArray.push(stockQuote.amount);
  });

  dtArray.map((v) => new Date(v).getTime() / 1000);

  return {
    dtArray,
    priceArray,
    amountArray,
  };
};
