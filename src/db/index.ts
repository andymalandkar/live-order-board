import { Order } from '../types';
import { v4 } from 'uuid';

const orders: { [key: string]: Order } = {};
const sellOrdersSummary: Order[] = [];
const buyOrdersSummary: Order[] = [];

const addOrder = (order: Order): string => {
  const uuid = v4();
  orders[uuid] = order;

  return uuid;
};

const addToSellOrdersSummary = () => {
  let pos = 0;
};

const cancelOrder = (id: string): Order => {
  const order = orders[id];
  delete orders[id];

  // ordersSummary[order.pricePerCoin] =
  //   ordersSummary[order.pricePerCoin] - order.orderQuantity;

  return order;
};

const getOrdersSummary = () => ({
  sellOrdersSummary,
  buyOrdersSummary,
});

export { addOrder, cancelOrder, getOrdersSummary };
