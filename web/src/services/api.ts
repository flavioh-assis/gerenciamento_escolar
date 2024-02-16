import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export { api };
