export function processPrice(price) {
  if (isNaN(price)) {
    return "";
  }
  const reversePriceArray = price.split("").reverse();
  const processData = reversePriceArray.reduce((acc, cur, idx) => {
    if (idx !== 0 && idx % 3 === 0) {
      return (acc += `,${cur}`);
    } else {
      return (acc += cur);
    }
  }, "");
  const reverseProcessData = processData.split("").reverse().join("");
  return reverseProcessData;
}
