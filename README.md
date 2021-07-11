# Live order board

Live order board is Javascript/ typescript utility library that provides helper functions to place, cancel crypto orders. Also, you can get your all orders summary.

Live order board [example](https://github.com/andymalandkar/live-order-board-example).

## Install

`npm i live-order-board-crypto-inc`

## Place order

You can send order request to BUY or SELL crypto. E.g.

```
{
    userId: 'user 1',
    coinType: 'Bitcoin',
    orderQuantity: 100,
    pricePerCoin: '£40',
    orderType: 'Buy',
}
```

## Orders summary

You can view top 10 orders in summary. Orders summary is organised using following assumptions:

1. Buy orders are organised in `DESC` order of `pricePerCoin`.
2. Sell orders are organised in `ASC` order of `pricePerCoin`.
3. Orders of same `pricePerCoin` and `coinType` are merged using `orderQuantity` for both buy & sell orders.

\*\*NOTE: In requirement document it has been mentioned to merge orders using `pricePerCoin`. But, I've considered merging them using both `pricePerCoin` & `coinType`. This can be change by making simple change in `createOrdersSummary` function.

## Usage

### Place Order

```node
import { placeOrder } from 'live-order-board-crypto-inc';

const orderId = placeOrder({
  userId: 'user 1',
  coinType: 'Bitcoin',
  orderQuantity: 100,
  pricePerCoin: '£40',
  orderType: 'Buy',
});
```

### Cancel Order

```node
import { cancelOrder } from 'live-order-board-crypto-inc';

cancelOrder('orderId');
```

### Orders Summary

```node
import { getOrdersSummary } from 'live-order-board-crypto-inc';

getOrdersSummary(count);

"count" is optional. Default order summary count is 10.
```
