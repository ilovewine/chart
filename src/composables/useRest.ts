import { ref } from 'vue';

const URL = import.meta.env.VITE_API_URL;
const LOGIN = import.meta.env.VITE_API_LOGIN;
const PASSWORD = import.meta.env.VITE_API_PASSWORD;

export default () => {
  const data = ref(null);

  (async () => {
    const headers = new Headers();
    const credentials = btoa(`${LOGIN}:${PASSWORD}`);
    headers.append('Authorization', `Basic ${credentials}`);

    data.value = await fetch(URL, {
      method: 'GET',
      headers,
    }).then((data) => data.json());
  })();

  return {
    data,
  };
};
