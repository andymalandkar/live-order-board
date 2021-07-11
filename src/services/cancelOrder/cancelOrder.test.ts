import cancelOrder from '.';
import { buyOrders, sellOrders } from '../../db';
import { CoinType, Order, OrderType } from '../../types';
import placeOrder from '../placeOrder';

describe('Cancel order', () => {
  beforeEach(() => {
    buyOrders.length = 0;
    sellOrders.length = 0;
  });

  describe('Cancel Buy order', () => {
    test('Should match both buy orders after cancel', () => {
      const orders: Order[] = [
        {
          userId: 'user 1',
          coinType: CoinType.Bitcoin,
          orderQuantity: 100,
          pricePerCoin: '£40',
          orderType: OrderType.Buy,
        },
        {
          userId: 'user 2',
          coinType: CoinType.Ethereum,
          orderQuantity: 100,
          pricePerCoin: '£30',
          orderType: OrderType.Sell,
        },
        {
          userId: 'user 3',
          coinType: CoinType.Bitcoin,
          orderQuantity: 100,
          pricePerCoin: '£20',
          orderType: OrderType.Buy,
        },
      ];

      orders[0].orderId = placeOrder(orders[0]);
      orders[1].orderId = placeOrder(orders[1]);
      orders[2].orderId = placeOrder(orders[2]);

      cancelOrder(orders[2].orderId);

      expect(buyOrders).toEqual([orders[0]]);
    });
  });

  describe('Cancel Sell order', () => {
    test('Should match both sell orders after cancel', () => {
      const orders: Order[] = [
        {
          userId: 'user 1',
          coinType: CoinType.Bitcoin,
          orderQuantity: 100,
          pricePerCoin: '£40',
          orderType: OrderType.Buy,
        },
        {
          userId: 'user 2',
          coinType: CoinType.Ethereum,
          orderQuantity: 100,
          pricePerCoin: '£30',
          orderType: OrderType.Sell,
        },
        {
          userId: 'user 3',
          coinType: CoinType.Bitcoin,
          orderQuantity: 100,
          pricePerCoin: '£20',
          orderType: OrderType.Sell,
        },
      ];

      orders[0].orderId = placeOrder(orders[0]);
      orders[1].orderId = placeOrder(orders[1]);
      orders[2].orderId = placeOrder(orders[2]);

      cancelOrder(orders[2].orderId);

      expect(sellOrders).toEqual([orders[1]]);
    });
  });
});
