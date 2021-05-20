import axios from 'axios';

axios.defaults.withCredentials = true;

const instance = axios.create();

instance.interceptors.request.use((config) => {
  // 認証トークンをリクエストパラメータに付与する
  const app_token = localStorage.getItem('appToken');
  config.params = { ...config.params, app_token: app_token };
  return config;
});
export default instance;
