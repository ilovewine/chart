import type { StockQuote } from '@/types/Stockquote';
import { ref, type Ref } from 'vue';

const URL = import.meta.env.VITE_API_URL;
const LOGIN = import.meta.env.VITE_API_LOGIN;
const PASSWORD = import.meta.env.VITE_API_PASSWORD;

export default () => {
  const data: Ref<StockQuote[]> = ref([]);

  (async () => {
    const headers = new Headers();
    const credentials = btoa(`${LOGIN}:${PASSWORD}`);
    headers.append('Authorization', `Basic ${credentials}`);

    data.value = (
      await fetch(URL, {
        method: 'GET',
        headers,
      }).then((data) => data.json())
    ).sort((a: StockQuote, b: StockQuote) => a.dt - b.dt);
  })();

  return {
    data,
  };
};
