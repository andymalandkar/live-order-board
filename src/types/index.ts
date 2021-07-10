export enum CoinType {
  Bitcoin = 'Bitcoin',
  Ethereum = 'Ethereum',
  Litecoin = 'Litecoin',
  Ripple = 'Ripple',
  Stellar = 'Stellar',
}

export enum OrderType {
  Buy = 'Buy',
  Sell = 'Sell',
}

export interface Order {
  orderId?: string;
  userId: string;
  coinType: CoinType;
  orderQuantity: number;
  pricePerCoin: string;
  orderType: OrderType;
}
