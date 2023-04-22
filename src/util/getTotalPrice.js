export default function getTotalPrice(cartList) {
  if (cartList && cartList.length > 0) {
    const total = cartList.reduce((acc, cur) => {
      return parseInt(acc + cur.price * cur.count);
    }, 0);
    return total;
  } else {
    return 0;
  }
}
