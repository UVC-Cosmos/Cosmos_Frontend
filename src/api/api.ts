import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

const apiInstanceWithToken = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export { apiInstance, apiInstanceWithToken };
