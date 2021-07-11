import getOrdersSummary from '.';
import { buyOrders, sellOrders } from '../../db';
import { CoinType, Order, OrderType } from '../../types';
import cancelOrder from '../cancelOrder';
import placeOrder from '../placeOrder';

describe('Orders Summary', () => {
  beforeEach(() => {
    buyOrders.length = 0;
    sellOrders.length = 0;
  });

  test('Should return simple summary on buy & sell request', () => {
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
    ];

    placeOrder(orders[0]);
    placeOrder(orders[1]);

    expect(getOrdersSummary()).toEqual({
      buyOrders: [
        `${orders[0].orderQuantity} of ${orders[0].coinType} for ${orders[0].pricePerCoin}`,
      ],
      sellOrders: [
        `${orders[1].orderQuantity} of ${orders[1].coinType} for ${orders[1].pricePerCoin}`,
      ],
    });
  });

  test('Should return sell order in ASC order and buy orders in DESC order', () => {
    const orders: Order[] = [
      {
        userId: 'user 1',
        coinType: CoinType.Bitcoin,
        orderQuantity: 100,
        pricePerCoin: '£210',
        orderType: OrderType.Buy,
      },
      {
        userId: 'user 2',
        coinType: CoinType.Ethereum,
        orderQuantity: 100,
        pricePerCoin: '£390',
        orderType: OrderType.Sell,
      },
      {
        userId: 'user 1',
        coinType: CoinType.Bitcoin,
        orderQuantity: 200,
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
    ];

    placeOrder(orders[0]);
    placeOrder(orders[1]);
    placeOrder(orders[2]);
    placeOrder(orders[3]);

    expect(getOrdersSummary()).toEqual({
      buyOrders: [
        `${orders[0].orderQuantity} of ${orders[0].coinType} for ${orders[0].pricePerCoin}`,
        `${orders[2].orderQuantity} of ${orders[2].coinType} for ${orders[2].pricePerCoin}`,
      ],
      sellOrders: [
        `${orders[3].orderQuantity} of ${orders[3].coinType} for ${orders[3].pricePerCoin}`,
        `${orders[1].orderQuantity} of ${orders[1].coinType} for ${orders[1].pricePerCoin}`,
      ],
    });
  });

  test('Should merge buy/sell orders quantity if Cointype and pricePerCoin is same', () => {
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
        userId: 'user 1',
        coinType: CoinType.Bitcoin,
        orderQuantity: 200,
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
    ];

    placeOrder(orders[0]);
    placeOrder(orders[1]);
    placeOrder(orders[2]);
    placeOrder(orders[3]);

    expect(getOrdersSummary()).toEqual({
      buyOrders: [
        `${orders[0].orderQuantity + orders[2].orderQuantity} of ${
          orders[0].coinType
        } for ${orders[0].pricePerCoin}`,
      ],
      sellOrders: [
        `${orders[1].orderQuantity + orders[3].orderQuantity} of ${
          orders[1].coinType
        } for ${orders[1].pricePerCoin}`,
      ],
    });
  });

  test('Should not merge buy/sell orders quantity if Cointype is same, but pricePerCoin is different', () => {
    const orders: Order[] = [
      {
        userId: 'user 1',
        coinType: CoinType.Bitcoin,
        orderQuantity: 100,
        pricePerCoin: '£210',
        orderType: OrderType.Buy,
      },
      {
        userId: 'user 2',
        coinType: CoinType.Ethereum,
        orderQuantity: 100,
        pricePerCoin: '£390',
        orderType: OrderType.Sell,
      },
      {
        userId: 'user 1',
        coinType: CoinType.Bitcoin,
        orderQuantity: 200,
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
    ];

    placeOrder(orders[0]);
    placeOrder(orders[1]);
    placeOrder(orders[2]);
    placeOrder(orders[3]);

    expect(getOrdersSummary()).toEqual({
      buyOrders: [
        `${orders[0].orderQuantity} of ${orders[0].coinType} for ${orders[0].pricePerCoin}`,
        `${orders[2].orderQuantity} of ${orders[2].coinType} for ${orders[2].pricePerCoin}`,
      ],
      sellOrders: [
        `${orders[3].orderQuantity} of ${orders[3].coinType} for ${orders[3].pricePerCoin}`,
        `${orders[1].orderQuantity} of ${orders[1].coinType} for ${orders[1].pricePerCoin}`,
      ],
    });
  });

  test('Should not merge buy/sell orders quantity if Cointype is different and pricePerCoin is same', () => {
    const orders: Order[] = [
      {
        userId: 'user 1',
        coinType: CoinType.Ripple,
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
        userId: 'user 1',
        coinType: CoinType.Bitcoin,
        orderQuantity: 200,
        pricePerCoin: '£40',
        orderType: OrderType.Buy,
      },
      {
        userId: 'user 2',
        coinType: CoinType.Litecoin,
        orderQuantity: 100,
        pricePerCoin: '£30',
        orderType: OrderType.Sell,
      },
    ];

    placeOrder(orders[0]);
    placeOrder(orders[1]);
    placeOrder(orders[2]);
    placeOrder(orders[3]);

    expect(getOrdersSummary()).toEqual({
      buyOrders: [
        `${orders[2].orderQuantity} of ${orders[2].coinType} for ${orders[2].pricePerCoin}`,
        `${orders[0].orderQuantity} of ${orders[0].coinType} for ${orders[0].pricePerCoin}`,
      ],
      sellOrders: [
        `${orders[3].orderQuantity} of ${orders[3].coinType} for ${orders[3].pricePerCoin}`,
        `${orders[1].orderQuantity} of ${orders[1].coinType} for ${orders[1].pricePerCoin}`,
      ],
    });
  });

  test('Should update orders summary after cancel order', () => {
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
        pricePerCoin: '£390',
        orderType: OrderType.Sell,
      },
      {
        userId: 'user 1',
        coinType: CoinType.Bitcoin,
        orderQuantity: 200,
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
    ];

    orders[0].orderId = placeOrder(orders[0]);
    placeOrder(orders[1]);
    placeOrder(orders[2]);
    placeOrder(orders[3]);

    expect(getOrdersSummary()).toEqual({
      buyOrders: [
        `${orders[0].orderQuantity + orders[2].orderQuantity} of ${
          orders[2].coinType
        } for ${orders[2].pricePerCoin}`,
      ],
      sellOrders: [
        `${orders[3].orderQuantity} of ${orders[3].coinType} for ${orders[3].pricePerCoin}`,
        `${orders[1].orderQuantity} of ${orders[1].coinType} for ${orders[1].pricePerCoin}`,
      ],
    });

    cancelOrder(orders[0].orderId);

    expect(getOrdersSummary()).toEqual({
      buyOrders: [
        `${orders[2].orderQuantity} of ${orders[2].coinType} for ${orders[2].pricePerCoin}`,
      ],
      sellOrders: [
        `${orders[3].orderQuantity} of ${orders[3].coinType} for ${orders[3].pricePerCoin}`,
        `${orders[1].orderQuantity} of ${orders[1].coinType} for ${orders[1].pricePerCoin}`,
      ],
    });
  });
});
