import axios from "axios";

axios.defaults.withCredentials = true;

const instance = axios.create();

instance.interceptors.request.use((config) => {
  // 認証トークンをリクエストパラメータに付与する
  return config;
});
export default instance;
