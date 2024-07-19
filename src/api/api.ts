import axios from 'axios';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3001'
});

const apiInstanceWithToken = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export { apiInstance, apiInstanceWithToken };
