import { v4 } from 'uuid';
import { buyOrders, orders, sellOrders } from '../../db';
import { Order, OrderType } from '../../types';
import _ from 'lodash';

const placeOrder = (order: Order): string => {
  const uuid = v4();
  order.orderId = uuid;
  orders[uuid] = order;

  if (order.orderType === OrderType.Buy) {
    buyOrders.splice(
      _.sortedIndexBy(
        buyOrders,
        order,
        (o: Order) => -Number(o.pricePerCoin.replace('£', '')),
      ),
      0,
      order,
    );
  } else {
    sellOrders.splice(
      _.sortedIndexBy(sellOrders, order, (o: Order) =>
        Number(o.pricePerCoin.replace('£', '')),
      ),
      0,
      order,
    );
  }

  return uuid;
};

export default placeOrder;
