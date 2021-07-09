enum CoinType {
  Bitcoin = 'Bitcoin',
  Ethereum = 'Ethereum',
  Litecoin = 'Litecoin',
  Ripple = 'Ripple',
  Stellar = 'Stellar',
}

export enum OrderType {
  BUY,
  SELL,
}

export interface Order {
  userId: string;
  coinType: CoinType;
  orderQuantity: number;
  pricePerCoin: string;
  orderType: OrderType;
}
