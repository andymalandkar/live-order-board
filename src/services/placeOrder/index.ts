import { addOrder } from '../../db';
import { Order } from '../../types';

export const PlaceOrder = (order: Order): string => addOrder(order);
