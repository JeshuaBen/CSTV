import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://api.pandascore.co',
  timeout: 10_000,
});

if (__DEV__) {
  httpClient.interceptors.response.use(
    (response) => {
      console.tron?.display({
        name: 'API Response',
        preview: `${response.config.method?.toUpperCase()} ${response.config.url}`,
        value: {
          status: response.status,
          data: response.data,
        },
        important: false,
      });
      return response;
    },
    (error) => {
      console.tron?.display({
        name: 'API Error',
        preview: `${error?.config?.method?.toUpperCase() ?? 'UNKNOWN'} ${error?.config?.url ?? ''}`,
        value: {
          message: error?.message,
          status: error?.response?.status,
          data: error?.response?.data,
        },
        important: true,
      });
      return Promise.reject(error);
    },
  );
}
