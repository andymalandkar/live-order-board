import _ from 'lodash';
import { buyOrders, orders, sellOrders } from '../../db';
import { OrderType } from '../../types';

const cancelOrder = (id: string) => {
  const canceledOrder = orders[id];
  delete orders[id];

  if (canceledOrder.orderType === OrderType.Buy) {
    _.remove(buyOrders, (o) => o.orderId === id);
  } else {
    _.remove(sellOrders, (o) => o.orderId === id);
  }
};

export default cancelOrder;
