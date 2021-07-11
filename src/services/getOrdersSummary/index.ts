import _ from 'lodash';
import { buyOrders, sellOrders } from '../../db';
import { Order } from '../../types';

interface OrdersSummary {
  buyOrders: string[];
  sellOrders: string[];
}

/**
 *
 * @param fetchCount
 * @returns ordersSummary
 * 1. Buy orders summary in DESC order of pricePerCoin
 * 2. Sell orders summary in ASC order of pricePerCoin.
 */
const getOrdersSummary = (fetchCount = 10): OrdersSummary => {
  return {
    sellOrders: createOrderSummary(sellOrders, fetchCount),
    buyOrders: createOrderSummary(buyOrders, fetchCount),
  };
};

const createOrderSummary = (
  currentOrders: Order[],
  fetchCount: number,
): string[] => {
  const ordersSummary: string[] = [];

  const groupedOrdersByPrice = _.groupBy(currentOrders, (o) => o.pricePerCoin);

  _.forIn(groupedOrdersByPrice, (orders, price) => {
    if (ordersSummary.length === fetchCount) return false;
    const groupedOrdersByCoinType = _.groupBy(orders, (o) => o.coinType);

    _.forIn(groupedOrdersByCoinType, (orders, coinType) => {
      if (ordersSummary.length === fetchCount) return false;

      const totalOrdersQuantity = _.sumBy(orders, (o) => o.orderQuantity);
      ordersSummary.push(`${totalOrdersQuantity} of ${coinType} for ${price}`);
    });
  });

  return ordersSummary;
};

export default getOrdersSummary;
