# Live order board

Live order board is Javascript/ typescript utility library that provides helper functions to place, cancel crypto orders. Also, you can get your all orders summary.

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
3. BUY orders quantity of same `coinType` and `pricePerCoin` are merged in summary.
4. SELL orders quantity of same `coinType` and `pricePerCoin` are merged in summary.

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

getOrdersSummary();
```
