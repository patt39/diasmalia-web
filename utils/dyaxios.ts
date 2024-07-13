import axios from 'axios';

export default axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_HOST_SERVER}`,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  withCredentials: true,
});
