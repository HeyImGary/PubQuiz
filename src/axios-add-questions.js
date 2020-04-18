import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pubquiz-9af42.firebaseio.com/',
});

export default instance;
