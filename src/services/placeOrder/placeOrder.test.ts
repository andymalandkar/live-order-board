import placeOrder from '.';
import { buyOrders, sellOrders } from '../../db';
import { CoinType, Order, OrderType } from '../../types';

describe('Place Order', () => {
  beforeEach(() => {
    buyOrders.length = 0;
    sellOrders.length = 0;
  });

  describe('Buy Order', () => {
    test('Should update buy orders and not sell orders', () => {
      const orderId = placeOrder({
        userId: 'user 1',
        coinType: CoinType.Bitcoin,
        orderQuantity: 100,
        pricePerCoin: '£30',
        orderType: OrderType.Buy,
      });

      expect(buyOrders).toEqual([
        {
          orderId,
          userId: 'user 1',
          coinType: CoinType.Bitcoin,
          orderQuantity: 100,
          pricePerCoin: '£30',
          orderType: OrderType.Buy,
        },
      ]);

      expect(sellOrders).toEqual([]);
    });

    test('Should be present in sorted order by pricePerCoin DESC', () => {
      const orders: Order[] = [
        {
          userId: 'user 1',
          coinType: CoinType.Bitcoin,
          orderQuantity: 100,
          pricePerCoin: '£20',
          orderType: OrderType.Buy,
        },
        {
          userId: 'user 2',
          coinType: CoinType.Ethereum,
          orderQuantity: 100,
          pricePerCoin: '£40',
          orderType: OrderType.Buy,
        },
        {
          userId: 'user 3',
          coinType: CoinType.Bitcoin,
          orderQuantity: 100,
          pricePerCoin: '£30',
          orderType: OrderType.Buy,
        },
      ];

      orders[0].orderId = placeOrder(orders[0]);
      orders[1].orderId = placeOrder(orders[1]);
      orders[2].orderId = placeOrder(orders[2]);

      expect(buyOrders).toEqual([orders[1], orders[2], orders[0]]);

      expect(sellOrders).toEqual([]);
    });
  });

  describe('Sell Order', () => {
    test('Should update sell orders and not buy orders', () => {
      const orderId = placeOrder({
        userId: 'user 1',
        coinType: CoinType.Bitcoin,
        orderQuantity: 100,
        pricePerCoin: '£30',
        orderType: OrderType.Sell,
      });

      expect(sellOrders).toEqual([
        {
          orderId,
          userId: 'user 1',
          coinType: CoinType.Bitcoin,
          orderQuantity: 100,
          pricePerCoin: '£30',
          orderType: OrderType.Sell,
        },
      ]);

      expect(buyOrders).toEqual([]);
    });

    test('Should be present in sorted order by pricePerCoin ASC', () => {
      const orders: Order[] = [
        {
          userId: 'user 1',
          coinType: CoinType.Bitcoin,
          orderQuantity: 100,
          pricePerCoin: '£40',
          orderType: OrderType.Sell,
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

      expect(sellOrders).toEqual([orders[2], orders[1], orders[0]]);

      expect(buyOrders).toEqual([]);
    });
  });

  describe('Buy & Sell Orders', () => {
    test('Should match both buy & sell orders and should be in sorted order DESC & ASC respectively', () => {
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
        {
          userId: 'user 3',
          coinType: CoinType.Bitcoin,
          orderQuantity: 100,
          pricePerCoin: '£10',
          orderType: OrderType.Sell,
        },
      ];

      orders[0].orderId = placeOrder(orders[0]);
      orders[1].orderId = placeOrder(orders[1]);
      orders[2].orderId = placeOrder(orders[2]);
      orders[3].orderId = placeOrder(orders[3]);

      expect(buyOrders).toEqual([orders[0], orders[2]]);
      expect(sellOrders).toEqual([orders[3], orders[1]]);
    });
  });
});
