export default function displayPrice(price: number) {
  const formatter = new Intl.NumberFormat('en-AU', {
    currency: 'AUD',
    maximumFractionDigits: 0,
  });
  return `AU$ ${formatter.format(price)}`;
}
