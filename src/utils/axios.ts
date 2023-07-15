import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_END_POINT}`;


const instance = axios.create({
  baseURL: baseUrl,
});

instance.interceptors.request.use(
  function setConfig(parameter) {
    const config = parameter;

    // config.headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${localStorage.getItem('42ence-token')}`
    // }
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${localStorage.getItem(
      '42ence-token'
    )}`;
    return config;
  },
  function getError(error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function handleResponse(response) {
    return response;
  },
  function handleError(error) {
    
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('42ence-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { instance };
