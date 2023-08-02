import axios from 'axios';

export default class FakeProductsClient {
  async products() {
    return (await axios.get('/products/items.json')).data;
  }
}
