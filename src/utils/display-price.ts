export default function displayPrice(price: number) {
  const formatter = new Intl.NumberFormat('en-AU', {
    // style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  });
  return formatter.format(price);
}
