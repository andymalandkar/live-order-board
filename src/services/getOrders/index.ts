import { buyOrders, sellOrders } from '../../db';

const getOrders = () => ({ sellOrders, buyOrders: buyOrders.reverse() });

export default getOrders;
