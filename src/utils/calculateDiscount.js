export function calculateDiscount(realPrice, disCountPerc) {
  const discountPrice = realPrice - realPrice * (disCountPerc / 100);
  return discountPrice.toFixed(2);
}
