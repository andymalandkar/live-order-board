import _ from 'lodash';
import { buyOrders, sellOrders } from '../../db';
import { Order } from '../../types';

interface OrdersSummary {
  buyOrders: string[];
  sellOrders: string[];
}

const getOrdersSummary = (): OrdersSummary => {
  return {
    sellOrders: createOrderSummary(sellOrders).slice(0, 10),
    buyOrders: createOrderSummary(buyOrders.reverse()).slice(0, 10),
  };
};

const createOrderSummary = (currentOrders: Order[]) => {
  const ordersSummary: string[] = [];

  const groupedOrdersByPrice = _.groupBy(currentOrders, (o) => o.pricePerCoin);

  _.forIn(groupedOrdersByPrice, (orders, price) => {
    const groupedOrdersByCoinType = _.groupBy(orders, (o) => o.coinType);

    _.forIn(groupedOrdersByCoinType, (orders, coinType) => {
      const totalOrdersQuantity = _.sumBy(orders, (o) => o.orderQuantity);
      ordersSummary.push(`${totalOrdersQuantity} of ${coinType} for ${price}`);
    });
  });

  return ordersSummary;
};

export default getOrdersSummary;
